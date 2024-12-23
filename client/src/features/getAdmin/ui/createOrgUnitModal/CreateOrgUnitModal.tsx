import { memo, useCallback, useState, useEffect} from 'react';

import { createOrgUnitItem, OrgUnitCreateData } from '@/entities/OrgUnitItem';
import { OrgUnitCreationCard } from '@/entities/OrgUnitItem';
import { Button } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';
import { ListBoxItem } from '@/shared/ui/Popups';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface Props {
	className?: string;
    isOpen: boolean;
    onCloseModal: () => void;
    updateUserNav: () => Promise<void>
    orgUnitsList: ListBoxItem<string>[]
}

const CreateOrgUnitModal = memo((props: Props) => {
    const { className, orgUnitsList, onCloseModal, isOpen, updateUserNav } = props;

    const [orgUnitData, setOrgUinitData] = useState<OrgUnitCreateData>()
    const [closingStatus, setClosingStatus] = useState(false);
    const [resetFlag, setResetFlag] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)

    useEffect(() => {
        setClosingStatus(false)
    }, [closingStatus]);

    const createHandler = useCallback(async () => {
        if( !orgUnitData) return
        setIsLoading(true);

        try {
            await createOrgUnitItem({...orgUnitData})
            await updateUserNav()
            setClosingStatus(true)
            setResetFlag((prev) => !prev)
        } catch (e) {
            console.error('Ошибка при создании пользователя:', e);
            setError(`${e}`);
        } finally {
            setIsLoading(false);
        }
    }, [orgUnitData, updateUserNav]);

    const closingHandler = useCallback(() => {
        setError(null);
        setClosingStatus(true)
        setResetFlag((prev) => !prev)
    }, []);

    useEffect(() => {
        if (orgUnitData?.name === '' || orgUnitData?.description === '') {
            setIsButtonDisabled(true)
        } else {
            setIsButtonDisabled(false)
        }
    },[orgUnitData])

    return (
        <Modal
            isOpen={isOpen}
            onClose={onCloseModal}
            lazy
            className={className}
            closeStatus={closingStatus}
        >
            <VStack gap='24' justify='between'>

                <Text title='Создание отдела' size="xl"/>

                <OrgUnitCreationCard
                    orgUnitsList={orgUnitsList}
                    resetFlag={resetFlag}
                    setOrgUinitData={setOrgUinitData}
                />

                {error && <Text title={error} variant='error' />}

                <HStack justify="end" align="center" gap='16' max>
                    <Button onClick={createHandler} variant='outline-inverted' disabled={isLoading || isButtonDisabled}>
                        {isLoading ? 'Создание...' : 'Создать'}
                    </Button>
                    <Button onClick={closingHandler} variant='outline-inverted'>Закрыть</Button>
                </HStack>
            </VStack>
        </Modal>
    );
});

export default CreateOrgUnitModal;