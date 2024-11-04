import { observer } from 'mobx-react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { PersonSearchCard, PersonSearched } from '@/entities/Person';
import { getRouteSearch, getRouteViewPerson } from "@/shared/const/router"
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';
import { Loader } from '@/shared/ui/Loader';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { ChangeOpacityMotion } from '@/widgets/Topbar/anim/OpacityAnimation';
import { ChangeSearchMotion } from '@/widgets/Topbar/anim/SearchPanelAnimation';

import cls from './SearchResults.module.scss';

interface Props {
	className?: string;
    searchData: PersonSearched[];
    inputValue: string;
    isLoading: boolean;
    setSearchData: React.Dispatch<React.SetStateAction<PersonSearched[]>>
    setInputValue: React.Dispatch<React.SetStateAction<string>>
    keyDownHandler: (event: { keyCode: number; }) => void
}

export const SearchResults = observer((props: Props) => {
    const { className, searchData, inputValue, isLoading, setSearchData, setInputValue, keyDownHandler } = props
    const navigate = useNavigate();
    const isNoResults = !isLoading && inputValue && !searchData.length;


    const clickHandler = useCallback((personId: string) => {
        navigate(getRouteViewPerson(personId));
        setSearchData([]);
        setInputValue('');
    }, [navigate, setInputValue, setSearchData]);

    const buttonClickHandler = useCallback(() => {
        if (inputValue) {
            navigate(getRouteSearch(inputValue));
            setSearchData([]);
            setInputValue('');
        }

    }, [inputValue, navigate, setInputValue, setSearchData]);

    return (
        <VStack
            id='block'
            align='center'
            justify='center'
            max
            className={classNames(cls.SearchResults, {}, [className])}
            onKeyDown={keyDownHandler}
        >                  

            {!isLoading &&
                <ChangeSearchMotion 
                    reanimate={searchData.length} 
                    flag={inputValue.length == 0}
                    duration={0.5} 
                    initialHeight={'80px'}
                    endHeight={'auto'}
                >
                    <ChangeOpacityMotion 
                        reanimate={searchData.length} 
                        initial={0} 
                        end={1} 
                        duration={2}
                    >
                        {searchData.slice(0, 5).map((p) => (
                            <PersonSearchCard
                                key={p.id}
                                personSearched={p}
                                onClick={() => clickHandler(p.id)}
                                className={searchData.length ? cls.display : cls.hidden}
                            />
                        ))}
                        {searchData.length > 5 && 
                            <HStack max align='center' justify='center'>
                                <Button variant='clear' onClick={buttonClickHandler}>
                                    <Text text='Показать все результаты...' className={cls.more} size='s'/>
                                </Button>
                            </HStack>
                        }
                    </ChangeOpacityMotion>
                </ChangeSearchMotion>
            }

            {isNoResults && 
                <ChangeSearchMotion 
                    reanimate={inputValue.length == 0 ? "true" : "false"} 
                    duration={0.5} 
                    initialHeight={inputValue.length == 0 ? 'auto' : '0'}
                    endHeight={inputValue.length == 0 ? '0' : 'auto'}
                >
                    <HStack max align='center' justify='center'>
                        <Text text='Ничего не найдено' className={cls.notFound}/>
                    </HStack>
                </ChangeSearchMotion>
            }

            {isLoading && 
                <ChangeSearchMotion 
                    reanimate={inputValue.length == 0 ? "true" : "false"} 
                    duration={0.5} 
                    initialHeight={inputValue.length == 0 ? 'auto' : '0'}
                    endHeight={inputValue.length == 0 ? '0' : 'auto'}
                    loader
                >
                    <Loader className={inputValue.length == 0 ? cls.hidden : cls.loader}/>
                </ChangeSearchMotion>
            }
        </VStack>
    );
});
