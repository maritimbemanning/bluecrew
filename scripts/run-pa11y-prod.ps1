$env:NEXT_DISABLE_TURBOPACK='1'
Write-Output 'Building prod bundle'
$build = Start-Process -FilePath 'npm.cmd' -ArgumentList 'run','build' -WorkingDirectory 'C:\dev\bluecrew' -Wait -PassThru
if ($build.ExitCode -ne 0) { Write-Error 'build failed'; exit 1 }

Write-Output 'Starting prod server'
$proc = Start-Process -FilePath 'npm.cmd' -ArgumentList 'start' -WorkingDirectory 'C:\dev\bluecrew' -PassThru
Write-Output "started $($proc.Id)"
$ready=$false
for ($i=0; $i -lt 120 -and -not $ready; $i++) {
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
  # warmup
  foreach ($p in @('/', '/jobbsoker', '/kunde', '/kontakt', '/om-oss', '/cookies')) {
    try { Invoke-WebRequest -Uri ("http://localhost:3000$p") -UseBasicParsing -TimeoutSec 5 | Out-Null } catch {}
  }
}
catch {}

Write-Output 'running pa11y home'
node scripts/pa11y-runner.js http://localhost:3000/ docs/pa11y-home.json
Write-Output 'home done'
node scripts/pa11y-runner.js http://localhost:3000/jobbsoker docs/pa11y-jobbsoker.json
Write-Output 'jobbsoker done'
node scripts/pa11y-runner.js http://localhost:3000/kunde docs/pa11y-kunde.json
Write-Output 'kunde done'
node scripts/pa11y-runner.js http://localhost:3000/kontakt docs/pa11y-kontakt.json
Write-Output 'kontakt done'
node scripts/pa11y-runner.js http://localhost:3000/om-oss docs/pa11y-om-oss.json
Write-Output 'om-oss done'
node scripts/pa11y-runner.js http://localhost:3000/cookies docs/pa11y-cookies.json
Write-Output 'cookies done'

if ($proc -and -not $proc.HasExited) { Stop-Process -Id $proc.Id -Force }
Write-Output 'finished'
