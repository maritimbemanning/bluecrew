$env:NEXT_DISABLE_TURBOPACK='1'
$proc = Start-Process -FilePath 'npm.cmd' -ArgumentList 'run','dev' -WorkingDirectory 'C:\dev\bluecrew' -PassThru
Write-Output "started $($proc.Id)"
$ready=$false
for ($i=0; $i -lt 60 -and -not $ready; $i++) {
  try {
    Invoke-WebRequest -Uri 'http://localhost:3000' -UseBasicParsing -TimeoutSec 2 -ErrorAction Stop | Out-Null
    Write-Output 'ready'
    $ready = $true
    break
  } catch {
    Start-Sleep -Seconds 1
  }
}
if (-not $ready) { Write-Error 'server not responding'; exit 1 }
try {
  # Warm up pages to avoid first-load streaming timing during audits
  Invoke-WebRequest -Uri 'http://localhost:3000/jobbsoker' -UseBasicParsing -TimeoutSec 5 | Out-Null
  Invoke-WebRequest -Uri 'http://localhost:3000/kunde' -UseBasicParsing -TimeoutSec 5 | Out-Null
} catch {
  Write-Output 'warmup: some pages failed to prefetch, continuing'
}
Write-Output 'running pa11y home'
# Wait a moment to allow Next.js dev stream to stabilize before auditing
npx pa11y http://localhost:3000/ --wait 1500 --timeout 60000 --reporter json > docs/pa11y-home.json
Write-Output 'home done'
npx pa11y http://localhost:3000/jobbsoker --wait 1500 --timeout 60000 --reporter json > docs/pa11y-jobbsoker.json
Write-Output 'jobbsoker done'
npx pa11y http://localhost:3000/kunde --wait 1500 --timeout 60000 --reporter json > docs/pa11y-kunde.json
Write-Output 'kunde done'
if ($proc -and -not $proc.HasExited) { Stop-Process -Id $proc.Id -Force }
Write-Output 'finished'