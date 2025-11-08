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
# Use programmatic runner to avoid networkidle waits in dev streaming
node scripts/pa11y-runner.js http://localhost:3000/ docs/pa11y-home.json
Write-Output 'home done'
node scripts/pa11y-runner.js http://localhost:3000/jobbsoker docs/pa11y-jobbsoker.json
Write-Output 'jobbsoker done'
node scripts/pa11y-runner.js http://localhost:3000/kunde docs/pa11y-kunde.json
Write-Output 'kunde done'
Write-Output 'running pa11y kontakt'
node scripts/pa11y-runner.js http://localhost:3000/kontakt docs/pa11y-kontakt.json
Write-Output 'kontakt done'
Write-Output 'running pa11y om-oss'
node scripts/pa11y-runner.js http://localhost:3000/om-oss docs/pa11y-om-oss.json
Write-Output 'om-oss done'
Write-Output 'running pa11y cookies'
node scripts/pa11y-runner.js http://localhost:3000/cookies docs/pa11y-cookies.json
Write-Output 'cookies done'
if ($proc -and -not $proc.HasExited) { Stop-Process -Id $proc.Id -Force }
Write-Output 'finished'