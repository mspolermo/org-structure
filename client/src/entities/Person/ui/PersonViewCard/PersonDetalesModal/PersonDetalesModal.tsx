import { observer } from 'mobx-react';
import { useCallback, useState, useEffect} from 'react';

import { fetchPersonDetales } from '@/entities/Person/model/services/fetchPersonDetales';
import PersonStore from '@/entities/Person/model/store/personStore';
import { PersonDetales } from '@/entities/Person/model/types/person';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Loader } from '@/shared/ui/Loader';
import { Modal } from '@/shared/ui/Modal';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';


interface Props {
    personId: string;
    isOpen: boolean;
    onCloseModal: () => void;
    store: PersonStore;
}

const PersonDetalesModal = observer((props: Props) => {
    const { onCloseModal, isOpen, personId, store } = props
    const [personDetales, setPersonDetales] = useState<PersonDetales>()
    const [closingStatus, setClosingStatus] = useState(false);
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setClosingStatus(false)
    }, [closingStatus]);

    const getPersonDetalesHandler = useCallback(async () => {
        if(!personId) return
        setIsLoading(true);
    
        try {
            await fetchPersonDetales(personId, store);
            setError(null);
        } catch (e) {
            console.error('Ошибка при создании пользователя:', e);
            setError(`${e}`);
        } finally {
            setIsLoading(false);
        }
    }, [personId, store]);

    useEffect(() => {
        if (isOpen) {
            getPersonDetalesHandler();
        }
    }, [isOpen, getPersonDetalesHandler])

    const personDetalesData = store.personDetales?.case({
        pending: () => {return null},
        rejected: () => {throw new Error()},
        fulfilled: (value) => {return value}
    })

    useEffect( ()=> {
        if (personDetalesData) setPersonDetales(personDetalesData)
    }, [ personDetalesData])

    const closingHandler = useCallback(() => {
        setError(null);
        setClosingStatus(true)
    }, []);


    return (
        <Modal
            isOpen={isOpen}
            onClose={onCloseModal}
            lazy
            closeStatus={closingStatus}
        >
            <VStack gap='24' justify='between'>

                {isLoading && <Loader />}

                {!isLoading && Boolean(personDetales) &&
                    <VStack gap="16" max >
                        <Text title="Детализация сотрудника" size="xl"/>
                        <VStack gap="8" max>
                            <HStack gap="8" max>
                                <Text title={'Оборудование:'} thin/>
                                <Input
                                    inputVariant="bordered"
                                    placeholder="Оборудование"
                                    value={personDetales?.items ?? 'Отсутствует'}
                                    readonly
                                />
                            </HStack>
                            <HStack gap="8" max>
                                <Text title={'Техника:'} thin/>
                                <Input
                                    inputVariant="bordered"
                                    placeholder="Техника"
                                    value={personDetales?.hardware ?? 'Отсутствует'}
                                    readonly
                                />
                            </HStack>
                            <HStack gap="8" max>
                                <Text title={'Програмное обеспечение:'} thin withoutWrap/>
                                <Input
                                    inputVariant="bordered"
                                    placeholder="Программное обеспечение"
                                    value={personDetales?.software ?? 'Отсутствует'}
                                    readonly
                                />
                            </HStack>
                            <HStack gap="8" max>
                                <Text title={'Пройденные курсы:'} thin withoutWrap/>
                                <Input
                                    inputVariant="bordered"
                                    placeholder="Пройденные курсы"
                                    value={personDetales?.exams ?? 'Отсутствует'}
                                    readonly
                                />
                            </HStack>
                        </VStack>
                    </VStack>
                }

                {error && <Text title={error} variant='error' />}

                <HStack justify="end" align="center" gap='16' max>
                    <Button onClick={closingHandler} variant='outline-inverted'>Закрыть</Button>
                </HStack>
            </VStack>
        </Modal>
    );
});

export default PersonDetalesModal;
