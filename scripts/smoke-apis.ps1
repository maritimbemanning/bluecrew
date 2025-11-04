param(
  [int]$TimeoutSec = 60
)

$ErrorActionPreference = 'Stop'

Write-Output 'Starting production server (npm start) in background...'
$proc = Start-Process -FilePath 'npm.cmd' -ArgumentList 'start' -WorkingDirectory 'C:\dev\bluecrew' -PassThru

$ready = $false
for ($i = 0; $i -lt $TimeoutSec; $i++) {
  try {
    Invoke-WebRequest -Uri 'http://localhost:3000' -UseBasicParsing -TimeoutSec 2 | Out-Null
    $ready = $true
    break
  } catch {
    Start-Sleep -Seconds 1
  }
}
if (-not $ready) {
  Write-Error 'Server not responding'
  if ($proc -and -not $proc.HasExited) { Stop-Process -Id $proc.Id -Force }
  exit 1
}
Write-Output 'Server is up.'

# Warm up routes
foreach ($path in @('/', '/jobbsoker', '/kunde', '/api/vipps/session', '/api/submit-candidate')) {
  try { Invoke-WebRequest -Uri ("http://localhost:3000$path") -UseBasicParsing -TimeoutSec 5 | Out-Null } catch {}
}

Write-Output 'Checking Vipps session endpoint...'
$vipps = Invoke-WebRequest -Uri 'http://localhost:3000/api/vipps/session' -UseBasicParsing -TimeoutSec 5
Write-Output "GET /api/vipps/session -> $($vipps.StatusCode) $($vipps.StatusDescription)"

Write-Output 'Checking submit-candidate GET...'
$subGet = Invoke-WebRequest -Uri 'http://localhost:3000/api/submit-candidate' -UseBasicParsing -TimeoutSec 5
Write-Output "GET /api/submit-candidate -> $($subGet.StatusCode)"

# Prepare dummy file for CV
$dummyPath = 'C:\dev\bluecrew\scripts\dummy.pdf'
Set-Content -Path $dummyPath -Value '%PDF-1.4\n% Dummy file for smoke test' -NoNewline -Encoding Ascii

Write-Output 'Submitting minimal candidate form (JSON accept) via curl.exe...'
& curl.exe -s -H "Accept: application/json" `
  -F "name=Test Kandidat" `
  -F "email=test+kandidat@bluecrew.no" `
  -F "phone=99999999" `
  -F "work_main=Matros" `
  -F "wants_temporary=ja" `
  -F "stcw_confirm=on" `
  -F "gdpr=yes" `
  -F "honey=" `
  -F "cv=@$dummyPath;type=application/pdf" `
  http://localhost:3000/api/submit-candidate

if ($proc -and -not $proc.HasExited) { Stop-Process -Id $proc.Id -Force }
Write-Output 'Done.'
