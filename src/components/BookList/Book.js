import React from 'react';
import { Link } from 'react-router-dom';
import '../BookList/BookList.css'

const Book = (book) => {
  return (
    <div className='book-item flex flex-column flex-sb'>
      <div className='book-item-img'>
        <img src={book.cover_img} alt="cover" />
      </div>
      <div className='book-item-info text-center'>
        {/* Kitap id'sine göre url'e yönlendirildi */}
        <Link to={`/book/${book.id}`} {...book}>
          <div className='book-item-info-item title fw-7 fs-18'>
            <span>{book.title}</span>
          </div>
        </Link>
        <div className='book-item-info-item author fs-15'>
          <span className='text-capitalize fw-7'>Author: </span>
          {/* Birden fazla yazar olabileceği için join kullanıldı */}
          <span>{book.author && book.author.join(", ")}</span>
        </div>
        <div className='book-item-info-item publish-year fs-15'>
          <span className='text-capitalize fw-7'>Page Count: </span>
          <span>{book.pageCount}</span>
      </div>
        <div className='book-item-info-item publish-year fs-15'>
          <span className='text-capitalize fw-7'>First Publish Year: </span>
          <span>{book.publishedDate}</span>
      </div>
      </div>
    </div>
  )
}

export default Book
