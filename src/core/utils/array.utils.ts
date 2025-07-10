export class ArrayUtils {
    static applyInversion<T>(array: T[], inversion:number): T[] {
        const result = Array.from(array);
        let remainingInversion = inversion-1;
        while (remainingInversion > 0) {
            const first = result.shift() as T;
            result.push(first);
            remainingInversion--;
        }
        return result;
    }
}
