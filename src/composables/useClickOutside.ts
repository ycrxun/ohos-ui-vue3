import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export function useClickOutside(elementRef: Ref<HTMLElement | null>) {
    const isClickOutside = ref(false)

    const handler = (e: MouseEvent) => {
        if (elementRef.value) {
            isClickOutside.value = !elementRef.value.contains(e.target as HTMLElement)
            if (isClickOutside.value) {
                // 触发外部点击回调
                if (typeof onClickOutside === 'function') {
                    onClickOutside()
                }
            }
        }
    }

    let onClickOutside: () => void = () => {}

    onMounted(() => {
        document.addEventListener('click', handler)
    })

    onUnmounted(() => {
        document.removeEventListener('click', handler)
    })

    const setOnClickOutside = (callback: () => void) => {
        onClickOutside = callback
    }

    return {
        isClickOutside,
        setOnClickOutside
    }
}
