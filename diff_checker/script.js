document.getElementById('compareButton').addEventListener('click', function() {
    var originalText = document.getElementById('originalText').value;
    var changedText = document.getElementById('changedText').value;
    var diffOutput = document.getElementById('diffOutput');

    var dmp = new diff_match_patch();
    var d = dmp.diff_main(originalText, changedText);
    dmp.diff_cleanupSemantic(d);
    diffOutput.innerHTML = dmp.diff_prettyHtml(d);
});
