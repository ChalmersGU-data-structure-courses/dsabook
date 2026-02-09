
# How to convert Keynote to PDF:

base='ADT_overview' && cwd=`pwd` && osascript <<SCRIPT
tell application "Keynote"
    open POSIX file "$cwd/$base.key"
    export front document to POSIX file "$cwd/$base.pdf" as PDF
    close front document saving no
end tell
SCRIPT
