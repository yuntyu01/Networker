document.addEventListener('DOMContentLoaded', function() {
    // 링크 정보를 포함한 데이터 배열
    var links = [
        { text: "운영자", href: "#" },
        { text: "운영자", href: "#" },
        { text: "운영자", href: "#" },
        { text: "운영자", href: "#" }
    ];

    // tbody 내부의 모든 행을 선택합니다.
    var tbodyRows = document.querySelectorAll('tbody .table-container');

    // 각 행의 3번째 th 요소를 선택하여 a 태그를 삽입하고 클릭 이벤트를 추가합니다.
    tbodyRows.forEach(function(row, index) {
        var th = row.querySelectorAll('th')[1];
        var countCell = row.querySelectorAll('th')[4]; // 다섯 번째 열 선택

        if (th) {
            var linkText = th.textContent;
            var a = document.createElement('a');
            a.href = links[index].href; // 각기 다른 링크 URL을 설정합니다.
            a.textContent = linkText;

            th.textContent = ''; // 기존 텍스트를 지웁니다.
            th.appendChild(a); // a 태그를 추가합니다.

            // 클릭 이벤트 리스너 추가
            th.addEventListener('click', function() {
                var currentCount = parseInt(countCell.textContent);
                countCell.textContent = currentCount + 1;
            });
        }
    });
});
