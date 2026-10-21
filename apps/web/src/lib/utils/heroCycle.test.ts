import { describe, expect, it } from 'vitest'
import { shouldMountCycleImage } from './heroCycle'

describe('shouldMountCycleImage', () => {
    it('mounts only the active image and the next one before the page has loaded', () => {
        const mounted = [0, 1, 2, 3, 4].filter((i) => shouldMountCycleImage(i, 0, 5, false))
        expect(mounted).toEqual([0, 1])
    })

    it('wraps the next image around the end of the cycle', () => {
        const mounted = [0, 1, 2, 3, 4].filter((i) => shouldMountCycleImage(i, 4, 5, false))
        expect(mounted).toEqual([0, 4])
    })

    it('mounts a user-picked image straight away', () => {
        expect(shouldMountCycleImage(3, 3, 5, false)).toBe(true)
    })

    it('mounts every image once the page has loaded', () => {
        const mounted = [0, 1, 2, 3, 4].filter((i) => shouldMountCycleImage(i, 0, 5, true))
        expect(mounted).toEqual([0, 1, 2, 3, 4])
    })
})
