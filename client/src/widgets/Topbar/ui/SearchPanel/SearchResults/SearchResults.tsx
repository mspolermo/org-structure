import { observer } from 'mobx-react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Person, PersonSearchCard } from '@/entities/Person';
import { getRouteSearch } from "@/shared/const/router"
import { classNames } from '@/shared/lib/classNames/classNames';
import { Loader } from '@/shared/ui/Loader';
import { VStack } from '@/shared/ui/Stack';
import { ChangeOpacityMotion } from '@/widgets/Topbar/anim/OpacityAnimation';
import { ChangeSearchMotion } from '@/widgets/Topbar/anim/SearchPanelAnimation';

import cls from './SearchResults.module.scss';

interface Props {
	className?: string;
    searchData: Person[];
    inputValue: string;
    setSearchData: React.Dispatch<React.SetStateAction<Person[]>>
    setInputValue: React.Dispatch<React.SetStateAction<string>>
    keyDownHandler: (event: {
        keyCode: number;
    }) => void
}

export const SearchResults = observer((props: Props) => {
    const { className, searchData, inputValue, setSearchData, setInputValue, keyDownHandler } = props
    
    const navigate = useNavigate();
    const isNoResults = Boolean(!searchData.length);

    const clickHandler = useCallback((name: string) => {
        navigate(getRouteSearch(name));
        setSearchData([]);
        setInputValue('');
    }, [navigate, setInputValue, setSearchData]);

    return (
        <VStack
            id='block'
            align='center'
            justify='center'
            max
            className={classNames(cls.SearchResults, {}, [className])}
            onKeyDown={keyDownHandler}
        >  
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
                    {searchData.map(p => 
                        <PersonSearchCard
                            key={p.id}
                            person={p}
                            department={'Отдел 16'}
                            onClick={() => clickHandler(p.name)}
                            className={searchData.length ? cls.display : cls.hidden}
                        />
                    )}
                </ChangeOpacityMotion>
            </ChangeSearchMotion>

            {isNoResults && 
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
