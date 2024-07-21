import { motion } from 'framer-motion';
import { Key, ReactNode, Ref, useRef } from 'react';

interface opacityMotionProps {
    children: ReactNode
    reanimate: Key
    initial: number
    end: number
    ease?: 'lenear' | 'easeOut' | 'backInOut'
    easeWithSpring?: boolean
    delay?: number
}

export const ChangeOpacityMotion = (props: opacityMotionProps) => {

    const {
        children, 
        reanimate, 
        initial, 
        end, 
        ease = 'lenear', 
        easeWithSpring = true, 
        delay = 0
    } = props;

    const motionElemRef = useRef<HTMLDivElement>();
    const initalRef = useRef() as React.MutableRefObject<string>;

    return (
        <motion.div
            key={reanimate}
            ref={motionElemRef as Ref<HTMLDivElement>}
            initial={{
                opacity: initial,
                backdropFilter: 'blur(3px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 'var(--overlay-z-index)',
                cursor: 'pointer'
            }}
            animate={{
                opacity: end,
                backdropFilter: 'blur(3px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 'var(--overlay-z-index)',
                cursor: 'pointer'
            }}
            onAnimationComplete={() => {
                if (!motionElemRef.current) return
                initalRef.current = getComputedStyle(motionElemRef.current).opacity;
            }}
            transition={{duration: 0.7, ease, type: easeWithSpring ? 'spring' : 'tween', delay}}
        >
            {children}
        </motion.div>
    );
};