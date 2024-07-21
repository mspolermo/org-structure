import { motion } from 'framer-motion';
import { Key, ReactNode, useRef, Ref } from 'react'

interface searchMotionProps {
    children: ReactNode
    reanimate: Key
    initialHeight: string
    endHeight: string
    duration: number
    ease?: 'lenear' | 'easeOut' | 'backInOut',
    easeWithSpring?: boolean
    delay?: number
    flag?: boolean
    loader?: boolean
}

export const ChangeSearchMotion = (props: searchMotionProps) => {

    const {
        children,
        reanimate,
        initialHeight,
        endHeight,
        duration = 0.5,
        ease = 'backInOut',
        easeWithSpring = true,
        delay = 0,
        flag,
        loader
    } = props;
  
    let flagVar = flag;

    const motionElemRef= useRef<HTMLDivElement>();
    const initialHeightRef = useRef() as React.MutableRefObject<string>;

    if(loader) {
        if(initialHeightRef.current == undefined && reanimate == "true") {
            flagVar = true;
        }
    }

    return (
        <motion.div
            key={reanimate}
            ref={motionElemRef as Ref<HTMLDivElement>}
            initial={{
                height: flagVar ? 0 : initialHeight, 
                width: loader ? 'auto' : '100%', 
                display: loader ? 'flex' : 'block', 
                alignItems: 'center'
            }}
            animate={{
                height: flagVar ? 0 : endHeight, 
                width: loader ? 'auto' : '100%', 
                display: loader ? 'flex' : 'block', 
                alignItems: 'center', 
                overflow: loader ? 'none' : 'hidden'
            }}
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