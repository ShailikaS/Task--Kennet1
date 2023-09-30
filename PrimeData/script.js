// Initialize variables for metrics
let totalTime = 0;
let singleTime = 0;
let primeTime = 0;
let numChecks = 0;
let primesFound = 0;
let checkMetricsHTML = ''; // Initialize as an empty string

function isPrime(num) {
  const start = performance.now();
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  let i = 5;
  while (i * i <= num) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
    i += 6;
  }
  const end = performance.now();
  singleTime += end - start;
  return true;
}

function getPrimesInRange(start, end) {
  const primes = [];
  for (let num = start; num <= end; num++) {
    const start = performance.now();
    if (isPrime(num)) {
      primes.push(num);
      primesFound++;
    }
    const end = performance.now();
    primeTime += end - start;
    numChecks++;

    // Update checkMetricsHTML
    checkMetricsHTML += `<tr><td>${num}</td><td>${isPrime(num) ? 'Yes' : 'No'}</td><td>${(end - start).toFixed(2)} ms</td></tr>`;
  }
  return primes;
}

function getAndDisplayPrimes() {
  // Reset checkMetricsHTML for each new check
  checkMetricsHTML = '';

  const start = parseInt(document.getElementById("start").value);
  const end = parseInt(document.getElementById("end").value);
  const startTime = performance.now();
  const primes = getPrimesInRange(start, end);
  const endTime = performance.now();
  totalTime = endTime - startTime;

  const primeList = document.getElementById("prime-list");
  primeList.innerHTML = ""; // Clear previous results
  primes.forEach((prime) => {
    const li = document.createElement("li");
    li.textContent = prime;
    primeList.appendChild(li);
  });

  // Display metrics
  document.getElementById("total-time").textContent = totalTime.toFixed(2) + " ms";
  document.getElementById("single-time").textContent = (singleTime / numChecks).toFixed(2) + " ms";
  document.getElementById("prime-time").textContent = (primeTime / primesFound).toFixed(2) + " ms";
  document.getElementById("average-time").textContent = ((singleTime + primeTime) / (numChecks + primesFound)).toFixed(2) + " ms";

  // Display check metrics
  const checkMetrics = document.getElementById("check-metrics");
  checkMetrics.innerHTML = checkMetricsHTML;
}

function showDetails() {
  const popup = document.getElementById("details-popup");
  popup.style.display = "block";
}

function closePopup() {
  const popup = document.getElementById("details-popup");
  popup.style.display = "none";
}

function openTab(tabName) {
  const tabs = document.getElementsByClassName("tab-content");
  for (let tab of tabs) {
    tab.style.display = "none";
  }
  const activeTab = document.getElementById(tabName);
  activeTab.style.display = "block";
}
