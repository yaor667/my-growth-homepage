/* 课程项目演示：用关键词和信息类型筛选已有的 HTML 卡片。 */
const controls = document.querySelector('#demo-controls');
const searchInput = document.querySelector('#item-search');
const resultsCount = document.querySelector('#results-count');
const resultCards = document.querySelectorAll('#demo-results li');
const emptyState = document.querySelector('#empty-state');
const resetButton = document.querySelector('#reset-search');

function renderResults() {
  const keyword = searchInput.value.trim().toLowerCase();
  const selectedType = controls.querySelector('input[name="item-type"]:checked').value;
  let matchCount = 0;

  // 同时满足关键词和类别才显示。空关键词会匹配所有卡片。
  resultCards.forEach((card) => {
    const matchesKeyword = card.textContent.toLowerCase().includes(keyword);
    const matchesType = selectedType === 'all' || card.dataset.type === selectedType;
    const matches = matchesKeyword && matchesType;

    card.hidden = !matches;
    if (matches) {
      matchCount += 1;
    }
  });

  resultsCount.textContent = '共 ' + matchCount + ' 条信息';
  emptyState.hidden = matchCount > 0;
}

searchInput.addEventListener('input', renderResults);
controls.addEventListener('change', renderResults);

resetButton.addEventListener('click', () => {
  searchInput.value = '';
  controls.querySelector('input[value="all"]').checked = true;
  renderResults();
  searchInput.focus();
});

// JS 加载成功后再显示控件；禁用 JS 时仍可阅读全部示例。
controls.hidden = false;
resultsCount.hidden = false;
renderResults();
