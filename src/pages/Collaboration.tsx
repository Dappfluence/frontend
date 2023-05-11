import React, {FC} from 'react';
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getFirestore, doc, getDoc} from "firebase/firestore";
import {Collaboration as Collab, populateCollaboration} from "../ui/collaborations/components/CollaborationCard.types";

const Collaboration: FC = () => {

  const {id = ''} = useParams();

  const {data: collaboration} = useQuery<unknown, unknown, Collab>({
    queryKey: ['collaboration', id],
    queryFn: async () => {
      let data = await getDoc(doc(getFirestore(), 'collaborations', id))
      if (!data.exists() || data.data() === undefined) {
        return undefined
      } else {
        return populateCollaboration(data.data()!)
      }
    }
  });

  if (!collaboration) return null;

  return (
    <div className={'mt-[144px] container mx-auto'}>
      <div className={'flex justify-between items-center gap-16'}>
        <div className={'grow'}>
          <h1 className={'text-5xl font-black'}>
            {collaboration?.brand.title}
          </h1>
          <div className={'mt-6 flex justify-between'}>
            <div>
              <p className={'text-xs'}>Collaboration type:</p>
              <p className={'text-base font-semibold mt-1'}>{collaboration.type} Collaboration</p>
            </div>
            <div>
              <p className={'text-xs'}>Dates:</p>
              <p className={'text-base font-semibold mt-1'}>
                <span>{new Date(collaboration.dates.start * 1000).toLocaleDateString()}</span>
                <span> - </span>
                <span>{new Date(collaboration.dates.end * 1000).toLocaleDateString()}</span>
              </p>
            </div>
            <div>
              <p className={'text-xs'}>Brand Link:</p>
              <div className={'mt-1'}>
                <a href='#' className={'text-base text-blue-500 font-semibold'}>{collaboration.brand.link}</a>
              </div>
            </div>
          </div>
        </div>
        <div>
          <img src={collaboration.brand.image} alt=""/>
        </div>
      </div>

      <div className={'flex mt-16 gap-16'}>

        <div className={'w-[45%]'}>

          <h3 className={'text-lg font-bold'}>
            Create an Engaging Video Featuring Gucci Products!
          </h3>

          <p className={'text-lg mt-4'}>
            We're looking for fashion and style influencers to create a sponsored video showcasing our latest
            collection. Your video should feature one or more of our products from this collection in an authentic and
            engaging way, while also highlighting the unique history and significance behind this collection. For
            example, you could create a lookbook video featuring our new collection, or film a tutorial on how to style
            our products.
            <br/>
            <br/>
            For this video collaboration, we're specifically looking for influencers who can showcase their unique style
            and creativity while featuring our Bamboo 1947 Collection. You should highlight the versatility and elegance
            of the collection by incorporating it into your everyday life, whether that's through creating a lookbook, a
            day-in-the-life vlog, or any other creative video concept that showcases our products and the Gucci
            lifestyle.
          </p>

        </div>


        <div>

          <h3 className={'text-lg font-bold'}>Main Requirements</h3>

          <div className={'mt-4 flex gap-6'}>
            <div>
              <p className={'text-xs'}>Platform:</p>
              <p className={'text-base font-semibold mt-1'}>YouTube</p>
            </div>
            <div>
              <p className={'text-xs'}>Amount of Subscriptions:</p>
              <p className={'text-base font-semibold mt-1'}>{'>'} 1 200 000</p>
            </div>
            <div>
              <p className={'text-xs'}>Account Age:</p>
              <p className={'text-base font-semibold mt-1'}>{'>'} 2 years</p>
            </div>
            <div>
              <p className={'text-xs'}>Amount of videos:</p>
              <p className={'text-base font-semibold mt-1'}>{'>'} 1 000</p>
            </div>
          </div>

          <div className={'mt-8'}>
            <h3 className={'text-lg font-bold'}>4 Representatives</h3>
            <p className={'text-xs'}>Feel free to ask our representative any questions regarding the task</p>

            <div className={'mt-4'}>

              <div className={'flex py-3 items-center'}>
                <div className={'rounded-full p-6 border'}></div>
                <div className={'grow ml-4'}>
                  <h4 className={'text-base font-semibold'}>Wellington Smytheington</h4>
                  <p className={'text-xs'}>w.smytheington@gucci.com</p>
                </div>
                <button>123</button>
              </div>
              <hr/>
              <div className={'flex py-3 items-center'}>
                <div className={'rounded-full p-6 border'}></div>
                <div className={'grow ml-4'}>
                  <h4 className={'text-base font-semibold'}>Wellington Smytheington</h4>
                  <p className={'text-xs'}>w.smytheington@gucci.com</p>
                </div>
                <button>123</button>
              </div>
              <hr/>
              <div className={'flex py-3 items-center'}>
                <div className={'rounded-full p-6 border'}></div>
                <div className={'grow ml-4'}>
                  <h4 className={'text-base font-semibold'}>Wellington Smytheington</h4>
                  <p className={'text-xs'}>w.smytheington@gucci.com</p>
                </div>
                <button>123</button>
              </div>
              <hr/>
              <div className={'flex py-3 items-center'}>
                <div className={'rounded-full overflow-hidden w-[50px] h-[50px] border'}>
                  <img src="https://via.placeholder.com/150x150" alt=""/>
                </div>
                <div className={'grow ml-4'}>
                  <h4 className={'text-base font-semibold'}>Wellington Smytheington</h4>
                  <p className={'text-xs'}>w.smytheington@gucci.com</p>
                </div>
                <button>123</button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Collaboration;
