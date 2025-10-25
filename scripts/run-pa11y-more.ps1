$pages = @(
  '/',
  '/jobbsoker/registrer',
  '/kunde/registrer-behov',
  '/kontakt',
  '/om-oss',
  '/cookies'
)

foreach ($p in $pages) {
  $out = 'docs/pa11y-' + ($p.TrimStart('/') -replace '/','-') + '.json'
  if ($out -eq 'docs/pa11y-.json') { $out = 'docs/pa11y-root.json' }
  Write-Output "Scanning $p -> $out"
  npx pa11y ("http://localhost:3000" + $p) --reporter json > $out
}
Write-Output "Done"
