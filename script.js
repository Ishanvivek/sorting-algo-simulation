const barsContainer = document.getElementById("bars-container");
const sortBtn = document.getElementById("sort-btn");
const algorithmSelect = document.getElementById("algorithm-select");
const description = document.getElementById("algorithm-description");
const sortingStatus = document.getElementById("sorting-status");

const algorithms = {
    bubble: "Bubble Sort: A simple sorting algorithm that repeatedly compares adjacent elements and swaps them if they are in the wrong order. Time Complexity: O(n²) (worst and average case), O(n) (best case).",
    selection: "Selection Sort: This algorithm divides the list into a sorted and an unsorted region. It repeatedly selects the smallest element from the unsorted region and moves it to the end of the sorted region. Time Complexity: O(n²) (worst, average, and best case).",
    insertion: "Insertion Sort: This algorithm builds the sorted array one element at a time. It finds the correct position for each element in the sorted part. Time Complexity: O(n²) (worst and average case), O(n) (best case).",
    quick: "Quick Sort: A divide-and-conquer algorithm that selects a pivot element and partitions the other elements into sub-arrays. Time Complexity: O(n²) (worst case), O(n log n) (average and best case).",
    heap: "Heap Sort: A comparison-based sorting algorithm that builds a max heap and repeatedly extracts the maximum element. Time Complexity: O(n log n) (worst, average, and best case).",
    merge: "Merge Sort: A divide-and-conquer algorithm that recursively sorts two halves and merges them back together. Time Complexity: O(n log n) (worst, average, and best case).",
    counting: "Counting Sort: A non-comparison-based sorting algorithm that counts occurrences of each element. Time Complexity: O(n + k) (worst, average, and best case), where k is the range of input values.",
    bucket: "Bucket Sort: A distribution-based algorithm that divides elements into several buckets and sorts each individually. Time Complexity: O(n²) (worst case), O(n + k) (average and best case), where k is the number of buckets."
};

// Display the definition of the selected algorithm
function displayDefinition() {
    const selectedAlgorithm = algorithmSelect.value;
    description.textContent = algorithms[selectedAlgorithm];
}

// Create random bars for sorting
function createBars(num = 20) {
    barsContainer.innerHTML = '';  // Clear previous bars
    for (let i = 0; i < num; i++) {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${Math.floor(Math.random() * 200) + 50}px`;
        barsContainer.appendChild(bar);
    }
}

// Swap two bars with animation
function swap(bar1, bar2) {
    return new Promise(resolve => {
        let tempHeight = bar1.style.height;
        bar1.style.height = bar2.style.height;
        bar2.style.height = tempHeight;
        setTimeout(() => resolve(), 300);  
    });
}

// Bubble Sort Algorithm
async function bubbleSort() {
    let bars = document.querySelectorAll(".bar");
    let len = bars.length;

    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            bars[j].style.backgroundColor = "yellow";
            bars[j + 1].style.backgroundColor = "yellow";

            let height1 = parseInt(bars[j].style.height);
            let height2 = parseInt(bars[j + 1].style.height);

            if (height1 > height2) {
                await swap(bars[j], bars[j + 1]);
            }

            bars[j].style.backgroundColor = "#007acc"; 
            bars[j + 1].style.backgroundColor = "#007acc"; 
        }
        bars[len - i - 1].style.backgroundColor = "green"; 
    }
    sortingStatus.textContent = "Sorting Done";
}

// Selection Sort Algorithm
async function selectionSort() {
    let bars = document.querySelectorAll(".bar");
    let len = bars.length;

    for (let i = 0; i < len; i++) {
        let minIndex = i;
        bars[i].style.backgroundColor = "yellow";
        for (let j = i + 1; j < len; j++) {
            bars[j].style.backgroundColor = "yellow";
            if (parseInt(bars[j].style.height) < parseInt(bars[minIndex].style.height)) {
                minIndex = j;
            }
            await new Promise(resolve => setTimeout(resolve, 100));
            bars[j].style.backgroundColor = "#007acc"; 
        }

        if (minIndex !== i) {
            await swap(bars[i], bars[minIndex]);
        }
        bars[i].style.backgroundColor = "green"; 
    }
    sortingStatus.textContent = "Sorting Done";
}

// Insertion Sort Algorithm
async function insertionSort() {
    let bars = document.querySelectorAll(".bar");

    for (let i = 1; i < bars.length; i++) {
        let key = parseInt(bars[i].style.height);
        let j = i - 1;

        while (j >= 0 && parseInt(bars[j].style.height) > key) {
            bars[j + 1].style.height = bars[j].style.height;
            j = j - 1;
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        bars[j + 1].style.height = key + "px";
        bars[j + 1].style.backgroundColor = "green"; 
    }
    sortingStatus.textContent = "Sorting Done";
}

// Quick Sort Algorithm
async function quickSort() {
    let bars = document.querySelectorAll(".bar");

    async function partition(low, high) {
        let pivot = parseInt(bars[high].style.height);
        let i = low - 1;

        for (let j = low; j < high; j++) {
            if (parseInt(bars[j].style.height) < pivot) {
                i++;
                await swap(bars[i], bars[j]);
            }
        }
        await swap(bars[i + 1], bars[high]);
        return i + 1;
    }

    async function quickSortHelper(low, high) {
        if (low < high) {
            let pi = await partition(low, high);
            await quickSortHelper(low, pi - 1);
            await quickSortHelper(pi + 1, high);
        } else {
            if (low >= 0 && low < bars.length) {
                bars[low].style.backgroundColor = "green"; 
            }
        }
    }

    await quickSortHelper(0, bars.length - 1);
    sortingStatus.textContent = "Sorting Done";
}

// Heap Sort Algorithm
async function heapSort() {
    let bars = document.querySelectorAll(".bar");
    
    async function heapify(n, i) {
        let largest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;

        if (left < n && parseInt(bars[left].style.height) > parseInt(bars[largest].style.height)) {
            largest = left;
        }

        if (right < n && parseInt(bars[right].style.height) > parseInt(bars[largest].style.height)) {
            largest = right;
        }

        if (largest !== i) {
            await swap(bars[i], bars[largest]);
            await heapify(n, largest);
        }
    }

    let len = bars.length;

    for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
        await heapify(len, i);
    }

    for (let i = len - 1; i > 0; i--) {
        await swap(bars[0], bars[i]);
        bars[i].style.backgroundColor = "green"; 
        await heapify(i, 0);
    }
    sortingStatus.textContent = "Sorting Done";
}

// Merge Sort Algorithm
async function mergeSort() {
    let bars = document.querySelectorAll(".bar");

    async function merge(left, mid, right) {
        let n1 = mid - left + 1;
        let n2 = right - mid;

        let leftArray = new Array(n1);
        let rightArray = new Array(n2);

        for (let i = 0; i < n1; i++) {
            leftArray[i] = parseInt(bars[left + i].style.height);
        }
        for (let j = 0; j < n2; j++) {
            rightArray[j] = parseInt(bars[mid + 1 + j].style.height);
        }

        let i = 0, j = 0, k = left;

        while (i < n1 && j < n2) {
            if (leftArray[i] <= rightArray[j]) {
                bars[k].style.height = leftArray[i] + "px";
                i++;
            } else {
                bars[k].style.height = rightArray[j] + "px";
                j++;
            }
            await new Promise(resolve => setTimeout(resolve, 100));
            k++;
        }

        while (i < n1) {
            bars[k].style.height = leftArray[i] + "px";
            await new Promise(resolve => setTimeout(resolve, 100));
            i++;
            k++;
        }

        while (j < n2) {
            bars[k].style.height = rightArray[j] + "px";
            await new Promise(resolve => setTimeout(resolve, 100));
            j++;
            k++;
        }
    }

    async function mergeSortHelper(left, right) {
        if (left < right) {
            let mid = Math.floor((left + right) / 2);
            await mergeSortHelper(left, mid);
            await mergeSortHelper(mid + 1, right);
            await merge(left, mid, right);
        } else {
            if (left >= 0 && left < bars.length) {
                bars[left].style.backgroundColor = "green"; 
            }
        }
    }

    await mergeSortHelper(0, bars.length - 1);
    sortingStatus.textContent = "Sorting Done";
}

// Counting Sort Algorithm
async function countingSort() {
    let bars = document.querySelectorAll(".bar");
    let len = bars.length;
    let output = new Array(len);
    let count = new Array(200).fill(0); 

    for (let i = 0; i < len; i++) {
        count[parseInt(bars[i].style.height)]++;
    }

    for (let i = 1; i < 200; i++) {
        count[i] += count[i - 1];
    }

    for (let i = len - 1; i >= 0; i--) {
        output[count[parseInt(bars[i].style.height)] - 1] = bars[i].style.height;
        count[parseInt(bars[i].style.height)]--;
    }

    for (let i = 0; i < len; i++) {
        bars[i].style.height = output[i];
        await new Promise(resolve => setTimeout(resolve, 100));
        bars[i].style.backgroundColor = "green"; 
    }
    sortingStatus.textContent = "Sorting Done";
}

// Bucket Sort Algorithm
async function bucketSort() {
    let bars = document.querySelectorAll(".bar");
    let len = bars.length;
    let buckets = Array.from({ length: len }, () => []);

    for (let i = 0; i < len; i++) {
        let index = Math.floor((parseInt(bars[i].style.height) - 50) / 200 * len); 
        buckets[index].push(parseInt(bars[i].style.height));
    }

    for (let i = 0; i < buckets.length; i++) {
        buckets[i].sort((a, b) => a - b);
    }

    let k = 0;
    for (let i = 0; i < buckets.length; i++) {
        for (let j = 0; j < buckets[i].length; j++) {
            bars[k].style.height = buckets[i][j] + "px";
            await new Promise(resolve => setTimeout(resolve, 100));
            bars[k].style.backgroundColor = "green"; 
            k++;
        }
    }
    sortingStatus.textContent = "Sorting Done";
}

// Sort the bars based on selected algorithm
sortBtn.addEventListener("click", async () => {
    let selectedAlgorithm = algorithmSelect.value;

    switch (selectedAlgorithm) {
        case "bubble":
            await bubbleSort();
            break;
        case "selection":
            await selectionSort();
            break;
        case "insertion":
            await insertionSort();
            break;
        case "quick":
            await quickSort();
            break;
        case "heap":
            await heapSort();
            break;
        case "merge":
            await mergeSort();
            break;
        case "counting":
            await countingSort();
            break;
        case "bucket":
            await bucketSort();
            break;
    }
});

// Initialize the simulation
createBars();
algorithmSelect.addEventListener("change", displayDefinition);
displayDefinition();
