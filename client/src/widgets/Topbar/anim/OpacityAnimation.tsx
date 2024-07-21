import { motion } from 'framer-motion';
import { Key, ReactNode, useRef, Ref } from 'react'

interface searchMotionProps {
    children: ReactNode
    reanimate: Key
    initial: number
    end: number
    duration: number
    ease?: 'lenear' | 'easeOut' | 'backInOut',
    easeWithSpring?: boolean
    delay?: number
}

export const ChangeOpacityMotion = (props: searchMotionProps) => {

    const {
        children,
        reanimate,
        initial,
        end,
        duration = 0.5,
        ease = 'backInOut',
        easeWithSpring = true,
        delay = 0,
    } = props;
  
    const motionElemRef= useRef<HTMLDivElement>();
    const initialOpacityRef = useRef() as React.MutableRefObject<string>;

    return (
        <motion.div
            key={reanimate}
            ref={motionElemRef as Ref<HTMLDivElement>}
            initial={{opacity: initial}}
            animate={{opacity: end}}
            onAnimationComplete={() => {
                if (!motionElemRef.current) return
                initialOpacityRef.current = getComputedStyle(motionElemRef.current).opacity;
            }}
            transition={{duration, ease, type: easeWithSpring ? 'spring' : 'tween', delay, bounce: 0.1}}
            exit={{opacity: 0}}
        >
            {children}
        </motion.div>
    );
};