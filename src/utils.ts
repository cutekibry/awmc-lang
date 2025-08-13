
export function firstSmallerOrEqual(arr: number[], target: number) {
    if (arr.length === 0 || arr[0] > target)
        return -1;

    let l = 0;
    let r = arr.length - 1;
    while (l < r) {
        const mid = Math.floor((l + r + 1) / 2);
        if (arr[mid] <= target)
            l = mid;
        else
            r = mid - 1;
    }
    return l;
}