import { motion } from 'framer-motion';
import { ReactNode, useRef, Ref } from 'react'

interface heightMotionProps {
    
    children: ReactNode
    initialHeight?: number
    duration?: number
    ease?: 'linear' | 'easeOut' | 'backInOut',
    easeWithSpring?: boolean
    delay?: number
}

export const OpeningPageAnimation = (props: heightMotionProps) => {

    const {
        children,
        duration = 0.4, // sec
        ease = 'linear',
        easeWithSpring = true,
        delay = 0,
    } = props;
  
    const motionElemRef= useRef<HTMLDivElement>();

    const variants = {
        open: {opacity: 1, width: '100%'},
        close: {opacity: 0, width: '100%'}
    }

    return (
        <motion.div
            ref={motionElemRef as Ref<HTMLDivElement>}
            initial={variants.close}
            animate={variants.open}
            onAnimationComplete={() => {
                if (!motionElemRef.current) return
            }}
            transition={{duration, ease, type: easeWithSpring ? 'spring' : 'tween', delay, bounce: 0.05}}
            exit={variants.close}
        >
            {children}
        </motion.div>
    );
};