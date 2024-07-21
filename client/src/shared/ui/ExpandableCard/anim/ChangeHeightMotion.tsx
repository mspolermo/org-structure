import { motion } from 'framer-motion';
import {
    Key,
    ReactNode,
    useRef,
    Ref,
    useState,
    useEffect
} from 'react'

interface heightMotionProps {
    children: ReactNode
    reanimate: Key
    initialHeight?: number
    duration: number
    ease?: 'lenear' | 'easeOut' | 'backInOut',
    easeWithSpring?: boolean
    delay?: number
}

export const ChangeHeightMotion = (props: heightMotionProps) => {

    const {
        children,
        reanimate,
        initialHeight = 0,
        duration = 0.5, // sec
        ease = 'backInOut',
        easeWithSpring = true,
        delay = 0,
    } = props;
  
    const motionElemRef= useRef<HTMLDivElement>();
    const initialHeightRef = useRef() as React.MutableRefObject<string>;

    const [overflowStatus, setOverflowStatus] = useState('hidden')

    useEffect( () => {
        if (reanimate == 'true') {
            setTimeout( () => {setOverflowStatus('visible')}, 300)
        } else {
            setTimeout( () => {setOverflowStatus('hidden')}, 300)
        }
    }, [reanimate])

    return (
        <motion.div
            key={reanimate}
            ref={motionElemRef as Ref<HTMLDivElement>}
            initial={{height: initialHeightRef.current || initialHeight, overflow: 'hidden', width: '100%'}}
            animate={{height: 'auto', overflow: overflowStatus, width: '100%'}}
            onAnimationComplete={() => {
                
                if (!motionElemRef.current) return
                initialHeightRef.current = getComputedStyle(motionElemRef.current).height;
            }}
            transition={{duration, ease, type: easeWithSpring ? 'spring' : 'tween', delay, bounce: 0.1}}
            exit={{opacity: 0}}
        >
            {children}
        </motion.div>
    );
};