import Image from 'next/image';
import React from 'react';
import AnimatedSection from './AnimatedSection';

const BrowseByStyle = () => {
  return (
    <>
      <div className='flex items-center justify-center mt-9'>
        
        <div className='bg-gray-100 w-full sm:w-[1239px] h-auto rounded-3xl'>
        <AnimatedSection>     <h1 className="text-[48px] font-extrabold text-center mb-6 mt-4 text-2xl md:text-[48px] leading-tight">
  BROWSE BY Dress STYLE
</h1>
</AnimatedSection>
<AnimatedSection>
          <div className='flex flex-wrap justify-center'>
            <Image
              src={"/Frame 61.png"}
              alt='casual'
              height={289}
              width={407}
              className='mr-6 mb-6 sm:mb-0'
            />
            <Image
              src={"/Frame 62.png"}
              alt='casual'
              height={289}
              width={684}
              className='mb-6 sm:mb-0'
            />
          </div>
          </AnimatedSection>
          <AnimatedSection>
          <div className='flex flex-wrap justify-center mt-7 mb-7'>
            <Image
              src={"/Frame 64.png"}
              alt='casual'
              height={289}
              width={684}
              className='mr-6 mb-6 sm:mb-0'
            />
            <Image
              src={"/Frame 63.png"}
              alt='casual'
              height={289}
              width={407}
              className='mb-6 sm:mb-0'
            />
          </div>
          </AnimatedSection>
        </div>
      </div>
    </>
  );
};

export default BrowseByStyle;
