$extension = ".txt"
for ($i = 0; $i -lt 50; $i++) {
    $fileName = "{0}{1}" -f $i, $extension
    $filePath = Join-Path -Path 'D:\Harkirat\project\algo-pnpm\algorithmic-arena\apps\problems\Double-exist\tests\input\' -ChildPath $fileName
    New-Item -Path $filePath -ItemType File
}
