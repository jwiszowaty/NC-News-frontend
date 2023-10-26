import React from 'react'

function Sorting() {
  return (
      <section id='sorting-section'>
          
          <form action="">
              sort by:
              <select name="" id="select-sorting">
                  <option value="date">date</option>
                  <option value="comment-count">comment count</option>
                  <option value="votes">votes</option>
              </select>
              order:
              <select name="" id="select-order">
                  <option value="DESC">descending</option>
                  <option value="ASC">ascending</option>
              </select>
          </form>
    </section>
  )
}

export default Sorting