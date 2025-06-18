'use client';

import useEmblaCarousel from 'embla-carousel-react'
import { User } from 'lucide-react';
import { TMDB_CONFIGURATION } from '../constants';

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

interface CastSliderProps {
  cast: Cast[];
}

const CastSlider = ({ cast }: CastSliderProps) => {
  const { images } = TMDB_CONFIGURATION;
  const [emblaRef] = useEmblaCarousel({ align: 'start' })

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {cast.map((c, index) => (
            <div className="embla__slide self-center text-center" key={index}>
              <div className="avatar">
                <div className="w-24 rounded-full">
                  {c.profile_path && <img src={images.base_url + "w92" + c.profile_path}
                    alt={c.name}
                  />}
                  {!c.profile_path && <User size={'46px'} />}
                </div>
              </div>
              <h2 className='text-sm mt-2'>{c.name}<br/><small>{c.character}</small></h2>
            </div>
          ))}
        </div>
      </div>

      {/* <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div> */}
    </section>

   
  )
}

export default CastSlider
