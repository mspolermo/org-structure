import {
    MutableRefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';

interface UseModalProps {
  onClose?: () => void;
  isOpen?: boolean;
  animationDelay: number;
  closeStatus?: boolean;
}

/**
 * Переиспользуемый хук для модальных компонентов (modal)
 * @param animationDelay - Задержка анимации
 * @param isOpen - Флаг, открыто ли модальное окно?
 * @param onClose - Функция закрытия модального окна
 * @param closeStatus - Внешний статус закрытия модального окна (для внешней кнопки, которая находится на уровень выше компонента Modal)
*/

export function useModal(props: UseModalProps) {
    const { animationDelay, isOpen, closeStatus, onClose } = props;

    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [isAnim, setIsAnim] = useState(false);

    const timerRef = useRef() as MutableRefObject<
    ReturnType<typeof setTimeout>
  >;



    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
            setIsAnim(true)
        }
    }, [isOpen]);

    const close = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, animationDelay);
        }
        setIsAnim(false)
    }, [onClose, animationDelay]);

    useEffect(() => {
        if (closeStatus) {
            close();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [closeStatus]);

    // Новые ссылки!
    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                close();
            }
        },
        [close],
    );

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }

        return () => {
            clearTimeout(timerRef.current);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    return {
        isClosing,
        isMounted,
        close,
        isAnim
    };
}
