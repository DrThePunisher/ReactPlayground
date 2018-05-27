import './App.css';

import * as React from 'react';

import { HeroApiClient } from './apis/HeroApi';
import { Hero, HeroCard } from './components/HeroCard/HeroCard';
import { HeroContainer } from './components/HeroContainer/HeroContainer';

class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">React Playground</h1>
                </header>
                <div className="App-heroCollection">
                    <HeroContainer
                        heroApi={new HeroApiClient()}
                        render={
                            (heroes: Hero[]) => {
                                return heroes.map((hero: Hero) => (<HeroCard
                                    key={hero.id}
                                    name={hero.name}
                                    race={hero.race}
                                    class={hero.class}
                                    level={hero.level}
                                />)
                                );
                            }
                        }
                    />
                </div>
            </div>
        );
    }
}

export default App;
