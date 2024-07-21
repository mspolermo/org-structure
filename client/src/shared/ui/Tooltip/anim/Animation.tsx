import { motion } from 'framer-motion';
import { Key, ReactNode, Ref, useRef } from 'react';

interface opacityMotionProps {
    children: ReactNode
    reanimate: Key
    initialOpacity: number
    endOpacity: number
    ease?: 'lenear' | 'easeOut' | 'backInOut'
    easeWithSpring?: boolean
    delay?: number
    zIndex?: number
}

export const ChangeOpacityMotion = (props: opacityMotionProps) => {

    const {
        children,
        reanimate,
        initialOpacity,
        endOpacity,
        ease = 'lenear',
        easeWithSpring = true,
        delay = 0,
        zIndex = 15
    } = props;

    const motionElemRef = useRef<HTMLDivElement>();
    const initalOpacityRef = useRef() as React.MutableRefObject<string>;

    return (
        <motion.div
            key={reanimate}
            ref={motionElemRef as Ref<HTMLDivElement>}
            initial={{
                opacity: initalOpacityRef.current || initialOpacity, 
                scaleX: reanimate == 'true' ? 0.9 : 1, 
                position: 'absolute', 
                zIndex: zIndex, 
                left: '50%'
            }}
            animate={{
                opacity: endOpacity, 
                scaleX: reanimate == 'true' ? 1 : 0.9,
                position: 'absolute', 
                zIndex: zIndex, 
                left: '50%'
            }}
            onAnimationComplete={() => {
                if (!motionElemRef.current) return
                initalOpacityRef.current = getComputedStyle(motionElemRef.current).opacity;
            }}
            transition={{ease, type: easeWithSpring ? 'spring' : 'tween', delay}}
        >
            {children}
        </motion.div>
    );
};