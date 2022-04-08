function copyGitLink(){
	document.getElementById("gitLink").style.display="block";
	var e = document.createRange();
	e.selectNodeContents(document.getElementById("gitLink"));
	var t = document.getSelection();
	t.removeAllRanges(),
	t.addRange(e),
	document.execCommand("Copy"),
	t.removeAllRanges(),
	mdui.snackbar({message:"已复制到剪贴板～ ( っ*'ω'*c)"}),
	document.getElementById("gitLink").style.display="none"
}