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
npx pa11y http://localhost:3000/ --wait 3000 --timeout 60000 --reporter json > docs/pa11y-home.json
Write-Output 'home done'
npx pa11y http://localhost:3000/jobbsoker --wait 3000 --timeout 60000 --reporter json > docs/pa11y-jobbsoker.json
Write-Output 'jobbsoker done'
npx pa11y http://localhost:3000/kunde --wait 3000 --timeout 60000 --reporter json > docs/pa11y-kunde.json
Write-Output 'kunde done'
Write-Output 'running pa11y kontakt'
npx pa11y http://localhost:3000/kontakt --wait 3000 --timeout 60000 --reporter json > docs/pa11y-kontakt.json
Write-Output 'kontakt done'
Write-Output 'running pa11y om-oss'
npx pa11y http://localhost:3000/om-oss --wait 3000 --timeout 60000 --reporter json > docs/pa11y-om-oss.json
Write-Output 'om-oss done'
Write-Output 'running pa11y cookies'
npx pa11y http://localhost:3000/cookies --wait 3000 --timeout 60000 --reporter json > docs/pa11y-cookies.json
Write-Output 'cookies done'
if ($proc -and -not $proc.HasExited) { Stop-Process -Id $proc.Id -Force }
Write-Output 'finished'