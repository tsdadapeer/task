import React, { useState } from 'react';
import SearchBar from './SearchBar';
import './styles.css';
export default function Home() {
    const [data, setData] = useState('');
    const List = [{ "title": "React", "id": "react" }, {
        "title":
            "Angular", "id": "angular"
    }, { "title": "Vue", "id": "vue" }, {
        "title":
            "Ember", "id": "ember"
    }];

    const colors = ["red", "blue", "green"];

    return (<div>
        <SearchBar List={colors} />
    </div>
    );
}