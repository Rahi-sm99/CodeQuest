Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)

' Change to the script's directory
WshShell.CurrentDirectory = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)

' Check if node_modules exists
Set fso = CreateObject("Scripting.FileSystemObject")
If Not fso.FolderExists("node_modules") Then
    WshShell.Run "cmd /c npm install --legacy-peer-deps", 1, True
End If

' Start the server in a new window
WshShell.Run "cmd /k npm run dev", 1, False

' Wait 2 seconds then open browser
WScript.Sleep 2000
WshShell.Run "http://localhost:3000", 1, False

