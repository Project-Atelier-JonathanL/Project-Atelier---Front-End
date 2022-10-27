import React, { useState, useEffect } from 'react';
import axios from 'axios'
import ReviewsList from './ReviewsList.jsx'
import RatingBreakdown from './RatingBreakdown.jsx'
import Modal from './Modal.jsx'
import './style.css'


const Reviews = (props) => {
  const [product, setProduct] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("")
  const [filter, setFilter] = useState([])

  function modal() {
    if (showModal) {
      setShowModal(false)
    } else if (!showModal) {
      setShowModal(true)
    }
  }

  function filterList(number) {
    if (!filter.includes(number)) {
      filter.push(number)
    } else {
      var index = filter.indexOf(number);
      filter.splice(index, 1)
    }
    console.log(filter)
  }
  useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/reviews?product_id=${props.product.id}&count=1000&sort=relative`, {
      headers: {
        'Authorization': process.env.AUTH_KEY
      }
    })
    .then((response) => {
      setProduct(response.data.results)
    })

    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/products/${props.product.id}`, {
      headers: {
        'Authorization': process.env.AUTH_KEY
      }
    })
    .then((response) => {
      setName(response.data.name)

    })
  }, [])

  function sorting(input) {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/reviews?product_id=${props.product.id}&count=100&sort=${input}`, {
      headers: {
        'Authorization': process.env.AUTH_KEY
      }
    })
    .then((response) => {
      setProduct(response.data.results)
    })
  }

  const [ids, setIds] = useState()

  useEffect(() => {
    console.log('ids', ids)
  }, [ids])

  return product.length !== 0 ? (
    <div id="reviews">
      <div className="reviews-parent">
        <h3 className="reviews-header">Ratings and Reviews</h3>
      </div>
      <div className="row">
        <RatingBreakdown className="reviews-content" product={product} productId={props.product.id} ids={(input) => setIds(input)} filterList={(number) => filterList(number)}/>
        <ReviewsList className="reviews-content" product={product} showModal={() => modal()} sorting={(input) => sorting(input)}
        filter={filter}/>
      </div>
      {showModal ? <Modal className="modal" showModal={() => modal()} name={name} id={props.product.id} ids={ids}/> : null}
    </div>
  ) : null
}
export default Reviews;