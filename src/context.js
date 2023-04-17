import React, {useState, useEffect, useContext} from 'react'
import { useCallback } from 'react'
import axios from 'axios';

const URL = 'https://www.googleapis.com/books/v1/volumes?q='
const KEY = 'AIzaSyCTjktazXHnzX9YuckW-oWmNZMSthKU1yY'
const AppContext = React.createContext();

export const AppProvider = ({children}) => {
    const [searchTerm, setSearchTerm] = useState('the lost world')
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [resultTitle, setResultTitle] = useState('');

    const fetchBooks = useCallback(async() => {
        try {
            axios(`${URL}${searchTerm}&key=${KEY}`)
            .then((res) => {
                const {items} = res.data;

                if(items){
                    const newBooks = items.slice(0, 20).map((bookSingle) => {
                        const {id} = bookSingle;
                        const {authors,pageCount,publishedDate,title} = bookSingle.volumeInfo; 
                        console.log(bookSingle,' context');
                        return{
                            id: id,
                            author: authors,
                            publishedDate: publishedDate,
                            pageCount: pageCount,
                            title: title
                        }
                    });

                    setBooks(newBooks)

                    if(newBooks.length > 1){
                        setResultTitle('Your Search Result')
                    }else{
                        setResultTitle('No Search Result Found!')
                    }
                }else{
                    setBooks([]);
                    setResultTitle('No Search Result Found!');
                }
                setLoading(false);
            })
            .catch((e) => console.log(e))
            .finally(() =>  setLoading(false));

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    },[searchTerm])

    useEffect(() => {

        fetchBooks();
    },[searchTerm, fetchBooks])


    return (
        <AppContext.Provider value={{loading, books, setSearchTerm, resultTitle, setResultTitle}}>{children}</AppContext.Provider>
    )
}

export const useBooks = () => useContext(AppContext)

export default AppContext;