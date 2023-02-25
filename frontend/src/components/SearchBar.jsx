import React, { useState, useEffect } from "react";
import { InputGroup, InputLeftElement } from "@chakra-ui/react";
import { AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList } from "@choc-ui/chakra-autocomplete";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import API_ENDPOINT from "./config";
import axios from "axios";

export default function SearchBar(props) {
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function fetchData() {
            if (searchTerm !== '') {
                await axios.get(`${API_ENDPOINT}/search?q=${searchTerm}`)
                    .then(response => {
                        setSearchResults(response.data.results);
                    })
            }
        }
        fetchData()
    }, [searchTerm])

    return (
        <AutoComplete rollNavigation mx={3}>
            <InputGroup w={props.width} display={props.show ? "flex" : { base: "none", md: "flex" }}>
                <InputLeftElement color="gray.50">
                    <FiSearch />
                </InputLeftElement>
                <AutoCompleteInput
                    placeholder="Search..."
                    autoFocus
                    _placeholder={{ color: 'gray.50' }}
                    focusBorderColor="teal.500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    { ...props}
                />
            </InputGroup>
            <AutoCompleteList bg="blackAlpha.900">
                {searchResults.map((option, oid) => (
                    <Link to={`/track/${option.id}`} key={`option-${oid}`}>
                        <AutoCompleteItem
                            value={option.title}
                            textTransform="capitalize"
                        >
                            {option.title}
                        </AutoCompleteItem>
                    </Link>
                ))}
            </AutoCompleteList>
        </AutoComplete>
    );
};
