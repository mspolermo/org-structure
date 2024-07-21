import { motion } from 'framer-motion';
import { Key, ReactNode, Ref, useRef } from 'react';

interface scaleMotionProps {
    children: ReactNode
    reanimate: Key
    initialScale: number
    endScale: number
    ease?: 'lenear' | 'easeOut' | 'backInOut'
    easeWithSpring?: boolean
    delay?: number
}

export const ChangeScaleMotion = (props: scaleMotionProps) => {

    const {
        children, 
        reanimate, 
        initialScale, 
        endScale, 
        ease = 'lenear', 
        easeWithSpring = true, 
        delay = 0
    } = props;

    const motionElemRef = useRef<HTMLDivElement>();
    const initalScaleRef = useRef() as React.MutableRefObject<string>;

    return (
        <motion.div
            key={reanimate}
            ref={motionElemRef as Ref<HTMLDivElement>}
            initial={{
                scale: initialScale, 
                position: 'relative',
                padding: '10px 20px 14px',
                borderRadius: '12px',
                background: 'var(--bg-color)',
                maxWidth: '60%',
                zIndex: 'var(--modal-z-index)',
                boxShadow: '0 1px 4px rgba(0, 0, 0, 0.24)',
                color: 'var(--text-color)'
            }}
            animate={{
                scale: endScale,
                position: 'relative',
                padding: '10px 20px 14px',
                borderRadius: '12px',
                background: 'var(--bg-color)',
                maxWidth: '60%',
                zIndex: 'var(--modal-z-index)',
                boxShadow: '0 1px 4px rgba(0, 0, 0, 0.24)',
                color: 'var(--text-color)'
            }}
            onAnimationComplete={() => {
                if (!motionElemRef.current) return
                initalScaleRef.current = getComputedStyle(motionElemRef.current).scale;
            }}
            transition={{duration: 0.7, ease, type: easeWithSpring ? 'spring' : 'tween', delay}}
        >
            {children}
        </motion.div>
    );
};