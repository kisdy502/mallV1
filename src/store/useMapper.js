import { useStore } from 'vuex'
import { computed } from 'vue'
export default function useState(mapper,mapFn){
    const store = useStore()
    const storeStateFns = mapFn(mapper)
    const storeState = {}
    Object.keys(storeStateFns).forEach(fnKey => {
        const fn = storeStateFns[fnKey].bind({$store: store})
        storeState[fnKey] = computed(fn)
    })
    return storeState
}

