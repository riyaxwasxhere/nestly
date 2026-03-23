import React from 'react'
import home from '../../assets/images/home.jpg'
import { FaSearch } from 'react-icons/fa'
import ValueCard from '../ui/ValueCard'
import CategorySlider from '../ui/CategorySlider'
import BudgetCard from '../ui/BudgetCard'
import house from '../../assets/images/house.png'

const PageContainer = () => {
  return (
    <main>
      {/* hero-section */}
      <section 
        className='relative h-screen bg-center bg-cover overflow-hidden'
        style={{ backgroundImage: `url(${home})`}}
      >
        <div className='absolute z-99 bg-black/60 inset-0 overflow-hidden'>
          <div className='relative h-full w-full z-1000 flex flex-col items-center justify-center'>
            <div className='text-white flex flex-col items-center justify-center my-10'>
              <h1 className='text-7xl font-extrabold '>Find Your Perfect</h1>
              <h1 className='text-7xl font-extrabold  text-amber-500 '>Stay Near Campus</h1>
              <p className='mt-5 text-lg w-[70%] text-center'>Discover affordable PGs, hostels, and flats near your college. Verified listings, honest prices, and zero brokerage.</p>
            </div>

            <div className='bg-orange-50/40 w-[35%] h-10 rounded-3xl border-amber-500 border-2 pl-2 flex items-center  text-wite justify-between'>
              <input
                className='text-white outline-0 border-0 flex-1'
                type="text" name="search" id="search" placeholder='Search by area or college ...'/>
              <button className='bg-amber-500 rounded-full h-full w-10 flex items-center justify-center cursor-pointer text-white '><FaSearch/></button>
            </div>
          </div>
        </div>

      </section>


      {/* Browse by accomodation type */}
      <section className=' bg-amber-950'>
        <div className='bg-black/80 inset-0 h-full p-20 px-55 text-white'>
          <div className='text-center font-semibold text-4xl mb-10'>
            <h2>Browse by Accommodation Type</h2>
          </div>
          <div className=''>
            <CategorySlider/>
          </div>
        </div>
      </section>

      {/* top listings */}
      <section className=' bg-amber-950'>
        <div className='bg-black/80 inset-0 h-full p-20 px-55 text-white'>
          <div className='text-center font-semibold text-4xl mb-10'>
            <h2>Top Listings</h2>
          </div>
          <div className='grid grid-cols-3 grid-rows-2 gap-5'>
            <div className='bg-amber-50 h-80 w-80 rounded-xl '>
              <div className='bg-rose-300 h-60 ' ></div>
            </div>
            <div className='bg-amber-50 h-80 w-80 rounded-xl '>
              <div className='bg-rose-300 h-60 ' ></div>
            </div>
            <div className='bg-amber-50 h-80 w-80 rounded-xl '>
              <div className='bg-rose-300 h-60 ' ></div>
            </div>
            <div className='bg-amber-50 h-80 w-80 rounded-xl '>
              <div className='bg-rose-300 h-60 ' ></div>
            </div>
            <div className='bg-amber-50 h-80 w-80 rounded-xl '>
              <div className='bg-rose-300 h-60 ' ></div>
            </div>
            <div className='bg-amber-50 h-80 w-80 rounded-xl '>
              <div className='bg-rose-300 h-60 ' ></div>
            </div>
            
          </div>
        </div>
      </section>

      {/* map view and rooms with budgets */}
      <article className='bg-amber-950 grid  grid-cols-[3fr_4fr]'>
        <section>
          <div className='bg-black/80 inset-0 h-full p-20 pl-55 text-white'>
            <div className='font-semibold text-4xl mb-10'>
              <h2>Find Rooms Within Your Budget</h2>
            </div>
            <div className='grid grid-cols-1 gap-6'>
              <BudgetCard budget="Under ₹4,000"/>
              <BudgetCard budget="₹4,000 - ₹6,000"/>
              <BudgetCard budget="₹6,000 - ₹8,000"/>
              <BudgetCard budget="₹8,000 - ₹10,000"/>
              <BudgetCard budget="₹10,000 - ₹12,000"/>
              <BudgetCard budget="Above ₹12,000"/>
            </div>
          </div>
        </section>

        <aside>
          <div className='bg-black/80 inset-0 h-full pr-55 pl-10 text-white font-extralight items-start pt-20 flex flex-col'>
            <div>
              <h2>Explore Rooms Closest to your College</h2>
              <h3>View all verified properties on an interactive map and choose the perfect distance from your college.</h3>
              <button className='border p-2 rounded-2xl mt-5 cursor-pointer' >Open Map</button>
            </div>
            <div className='bg-amber-50/40 flex-1 my-5 w-full rounded-lg flex items-center justify-center text-black font-semibold'>
              <h2>Map Preview</h2>
            </div>
          </div>
        </aside>
      </article>
      
    
      {/* why this platform */}
      <section className='h-dvh bg-amber-950'>
        <div className='bg-black/80 inset-0 h-full p-20 px-55 text-white'>
          <div className='text-center font-semibold text-4xl m-10'>
            <h2>Why Students Love Our Platform?❤️</h2>
          </div>
          <div className='grid grid-cols-2 gap-7'>
            <ValueCard photo="src/assets/images/verify.png" heading="Verified Listings"  text="Real Photos, real owners, no scams."/>
            
            <ValueCard photo="src/assets/images/no-brokerage.jpg" heading="No Brokerage" text="Direct owner-to-student communication."/>
            
            <ValueCard photo="src/assets/images/map.png" heading="Map-Based Search" text="See properties closest to your college."/>
            
            <ValueCard photo="src/assets/images/student.png" heading="Made for Students" text="PGs, flats, and hostels that fit student budgets."/>
            
            <ValueCard photo="src/assets/images/contact.jpg" heading="Instant Contact" text="Call or message the owner directly."/>
            
            <ValueCard photo="src/assets/images/room.png" heading="Photo & Video Tours" text="Check rooms online before visiting."/>
          </div>
        </div>
      </section>
      
      <section className=' bg-amber-950'>
        <div className='bg-black/60 inset-0 h-full p-20 px-55 text-white flex items-center justify-between'>
          <div className='flex flex-col justify-between gap-5'>
            <h2 className='font-bold text-3xl mb-10'>How It Works</h2>
            <div>
              <p className='font-semibold'>Step 1 — Search</p>
              <p className='text-sm'>Use filters to find PGs, flats, and hostels near SIT.</p>
            </div>
            <div>
              <p className='font-semibold'> Step 2 — Compare</p>
              <p className='text-sm'>Check photos, rent, distance, and amenities.</p>
            </div>
            <div>
              <p className='font-semibold'>Step 3 — Contact Owner</p>
              <p className='text-sm'>Call/message the owner directly. No brokers.</p>
            </div>
          </div>
          <div
            className='bg-center bg-cover h-75 w-75'
            style={{backgroundImage: `url(${house})`}}
          ></div>
        </div>
      </section>
    </main>
  )
}

export default PageContainer
