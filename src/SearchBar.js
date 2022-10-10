import React, { useEffect, useState } from 'react';
import './styles.css';

export default function SearchBar(props) {
    const [expanded, setExpanded] = useState(false);
    const [dataList, setDataList] = useState([]);
    const [list, setList] = useState([]);
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);

    useEffect(() => {
        const updatedList = props.List.map((data, index) => {
            if (!data.title) {
                return {
                    title: data,
                    id: index.toString(),
                };
            } else if (!data.id) {
                return {
                    title: data.title,
                    id: index.toString(),
                };
            }
            return data;
        });
        console.log("1", updatedList)
        setDataList(updatedList);
        setList(updatedList);
    }, []);

    const handleSelectAll = e => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(list.map(li => li.id));
        if (isCheckAll) {
            setIsCheck([]);
        }
    };

    const handleClick = e => {
        const { id, checked } = e.target;
        setIsCheck([...isCheck, id]);
        if (!checked) {
            setIsCheck(isCheck.filter(item => item !== id));
        }
    };

    const showCheckboxes = () => {
        if (!expanded) {
            setExpanded(true);
        }
    }

    const handleSearch = (event) => {
        const filteredList = dataList.filter((x => x.title.includes(event.target.value)));
        setList(filteredList);
    }

    const handleClear = () => {
        setIsCheckAll(false);
        setIsCheck([]);
    }

    const handleSubmit = () => {
        //Submit code here
        setIsCheckAll(false);
        setIsCheck([]);
    }

    return (<div>
        <form>
            <div className="multiselect">
                <div className="selectBox">
                    <input type="text" placeholder='Search Bar....' onChange={handleSearch} onFocus={showCheckboxes} />
                </div>
                {expanded && list.length > 0 && <div id="checkboxes" className="form">
                    <div className="input-container">
                        <input type="checkbox" id="one" onClick={handleSelectAll} checked={isCheckAll} />
                        <label>Select All</label>
                    </div>
                    {list.map(data => <div className="input-container">
                        <input type="checkbox" id={data.id} key={data.id} onChange={handleClick} checked={isCheck.includes(data.id)} />
                        <label>{data.title}</label>
                    </div>)}
                    <div className="input-container">
                        <button type="button" onClick={handleClear}>Clear</button>
                        <button type="button" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>}
            </div>
        </form>
    </div>
    )
}