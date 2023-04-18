import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../Loader/Loader'
import coverImg from '../../images/cover_not_found.jpg'
import axios from 'axios'
import './BookDetails.css'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const URL = 'https://www.googleapis.com/books/v1/volumes/'
const BookDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    async function getBookDetails() {
      try {
        axios(`${URL}${id}`)
          .then((res) => {
            //const {item} = res;
            console.log(res.data, 'detail')
            if (res.data) {
              // api'den gelen data içerisindeki volumeInfodan gerekli bilgiler ilgili değişkenlere alındı
              const { description, pageCount, publisher, imageLinks, publishedDate, title } = res.data.volumeInfo;
              console.log(imageLinks.thumbnail,'asd')
              // yeni liste oluşturulup değişkenlere yeni değerler atandı
              const newBook = {
                description: description ? description : 'No description found',
                title: title,
                pageCount: pageCount ? pageCount : 'Not Found Page Count',
                cover_img: imageLinks ? imageLinks.thumbnail : coverImg,
                publisher: publisher ? publisher : 'No publisher found',
                publishedDate: publishedDate ? publishedDate : 'Not Found'
              };
              setBook(newBook);
            } else {
              setBook(null)
            }
            setLoading(false);
          })
          .catch((e) => console.log(e))
          .finally(() => setLoading(false));
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getBookDetails();
  }, [id])
  console.log(book.description,'2312312')

  // html etiketleri ile gelen text içerisinden etiketler kaldırıldı
  function removeTags(str) {
    if(str){
      if ((str===null) || (str===''))
      return false;
    else
      str = str.toString();
    
    // remove <p> tags
    str = str.replace(/<\/?p[^>]*>/g, '');
  
    // remove <i> tags
    str = str.replace(/<\/?i[^>]*>/g, '');

    // remove <i> tags
    str = str.replace(/<\/?br[^>]*>/g, '');
    }
  
    return str;
  }
  if (loading) return <Loading />

  return (
    <section className='book-details'>
      <div className='container'>
        <button type='button' className='flex flex-c back-btn' onClick={() => navigate("/book")}>
          <FaArrowLeft size={22} />
          <span className='fs-18 fw-6'>Go Back</span>
        </button>
      </div>
      <div className='book-details-content grid'>
          <div className='book-details-img'>
            <img src = {book?.cover_img} alt = "cover img" />
          </div>
          <div className='book-details-info'>
            <div className='book-details-item title'>
              <span className='fw-6 fs-24'>{book?.title}</span>
            </div>
            <div className='book-details-item description'>
              <span>{removeTags(book?.description)}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Publisher: </span>
              <span className='text-italic'>{book?.publisher}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Subject Times: </span>
              <span className='text-italic'>{book?.publishedDate}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Page Count: </span>
              <span>{book?.pageCount}</span>
            </div>
          </div>
        </div>
    </section>
  )
}

export default BookDetails
