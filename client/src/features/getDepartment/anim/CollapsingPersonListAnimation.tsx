import { motion } from 'framer-motion';
import {  ReactNode, useRef, Ref } from 'react'

interface heightMotionProps {
    children: ReactNode
    isOpen: boolean;
    initialHeight?: number
    duration: number
    ease?: 'linear' | 'easeOut' | 'backInOut',
    easeWithSpring?: boolean
    delay?: number
}

export const CollapsingPersonListAnimation = (props: heightMotionProps) => {

    const {
        children,
        duration = 0.1, // sec
        ease = 'linear',
        easeWithSpring = true,
        delay = 0,
        isOpen
    } = props;
  
    const motionElemRef= useRef<HTMLDivElement>();
    const initialHeightRef = useRef() as React.MutableRefObject<string>;

    const variants = {
        open: {opacity: 1, height: 'auto', overflow: 'hidden', width: '100%', },
        close: {opacity: 0, height: 0, overflow: 'hidden', width: '100%'}
    }

    return (
        <motion.div
            ref={motionElemRef as Ref<HTMLDivElement>}
            initial={{height: initialHeightRef.current || 'auto', opacity: 1, overflow: 'hidden', width: '100%'}}
            // whileInView={{opacity: 1}}
            animate={!isOpen ? variants.open : variants.close}
            onAnimationComplete={() => {
                if (!motionElemRef.current) return
                initialHeightRef.current = getComputedStyle(motionElemRef.current).height;
            }}
            transition={{duration, ease, type: easeWithSpring ? 'spring' : 'tween', delay, bounce: 0.05}}
            exit={{height: 'auto', overflow: 'hidden'}}
        >
            {children}
        </motion.div>
    );
};