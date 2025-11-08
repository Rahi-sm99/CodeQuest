Set fso = CreateObject("Scripting.FileSystemObject")
Set WshShell = CreateObject("WScript.Shell")
scriptDir = fso.GetParentFolderName(WScript.ScriptFullName)
batFile = scriptDir & "\start.bat"

Set oShellLink = WshShell.CreateShortcut(WshShell.SpecialFolders("Desktop") & "\Code Quest 2.lnk")
oShellLink.TargetPath = batFile
oShellLink.WorkingDirectory = scriptDir
oShellLink.Description = "Start Code Quest 2 Website"
oShellLink.IconLocation = "shell32.dll,13"
oShellLink.Save

MsgBox "Desktop shortcut created successfully!" & vbCrLf & vbCrLf & "You can now double-click the shortcut on your Desktop to start the website!", vbInformation, "Success"

