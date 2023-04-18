import React from 'react'
import { useBooks } from '../../context'
import Loading from '../Loader/Loader'
import coverImg from '../../images/cover_not_found.jpg';
import Book from '../BookList/Book'

const BookList = () => {
  // Context içerisinden ilgili değişenler alındı
  const { books, loading, resultTitle, pageCount} = useBooks();

  const booksWithCovers = books.map((singleBook) => {
    console.log(singleBook.id,'asasdas')
    return{
      ...singleBook,
      // removing /works/ to get only id
      id: (singleBook.id).replace('/works/',''),
      cover_img: singleBook.id ? `http://books.google.com/books/content?id=${singleBook.id}&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE7063Ev8XzHeHtnIIlX3BDJ9H_z5NVbqrAmnOsCaZD7KnEmLIBcNB33jVMapIzKX3VPZIWXwvEPCQp6bfyK5N3GIc5nOBLUeWL5-tBnQ3uQMKZ2DrY7zFIna3h2mw54M3TH7vhQB&source=gbs_api` : coverImg
    }
    
  })
  
  console.log(booksWithCovers)

  if(loading) return <Loading/>
  return (
     <section className='booklist'>
      <div className='container'>
        <div className='section-title'>
          <h2>{resultTitle}</h2>
        </div>
        <div className='booklist-content grid'>
          {
            booksWithCovers.slice(0, 30).map((item, index) => {
              return (
                <Book key = {index} {...item} />
              )
            })
          }
        </div>
      </div>
    </section>
  )
}

export default BookList
