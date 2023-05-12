import React, {FC} from 'react';
import Card from "../ui/influencer_profile/components/card";
import EditIcon from "../assets/icons/EditIcon";
import TwitterFilled from "../assets/icons/TwitterFilled";
import InfoStack from "../shared/ui/InfoStack";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import {Link} from "react-router-dom";
import {ConnectButton} from "@rainbow-me/rainbowkit";

const pastCollaboration = {
  id: 123,
  brand: {link: "https://www.gucci.com", image: "https://via.placeholder.com/150x50", title: "Gucci"},
  dates: {end: 1683427200, start: 1677465600},
  reward: 2000,
  tags: ["fashion", "gucci", "clothes"],
  content: { title: "Create an Engaging Video Featuring Gucci Products!"},
  type: "VIDEO",
}

const data = {
  first_name: 'Konstantin',
  last_name: 'Konstantinopolsky',
  social: [{text: 'email@gmail.com', link: 'mailto:email@gmail.com'}, {text: '@twitter_handler', link: '#'}],
  accounts: [{
    twitter: '@twitter_handler',
    followers: '780000',
    registered_at: '2020-09-12T00:00:00.000Z',
    posts: '9503'
  }],
  collaboration: {
    active: [pastCollaboration],
    past: [pastCollaboration]
  },
  badges: []
}

dayjs.extend(relativeTime);

const InfluencerProfile: FC = () => {


  return (
    <div className={'container mx-auto mt-[144px] '}>
      <h1 className={'text-5xl font-black'}>My profile</h1>
      <div className={'flex justify-between mt-8'}>
        <div className={'flex flex-col gap-5 w-[63%]'}>
          <Card className={'flex items-center justify-between'}>
            <div className={'flex gap-6 items-center'}>

              <div className={'h-36 w-36 overflow-hidden rounded-full'}>
                <img src="https://via.placeholder.com/150x150" alt=""/>
              </div>
              <div>
                <h2 className={'text-3xl font-bold'}>{data.first_name} {data.last_name}</h2>
                <p className={'flex gap-4 mt-2'}>
                  {data.social.map(media => (
                    <a href={media.link} className={'text-base hover:text-blue-500'}>{media.text}</a>
                  ))}
                </p>
              </div>
            </div>
            <div className={'cursor-pointer'}>
              <EditIcon/>
            </div>
          </Card>

          <Card>
            <div className={'flex justify-between'}>
              <h3 className={'text-2xl font-bold'}>{data.accounts.length} Social
                Account{data.accounts.length !== 1 && 's'}</h3>
              <button className={'text-base text-blue-400 font-semibold'}>Add account</button>
            </div>
            {
              data.accounts.length > 0 && (
                <div className={'mt-4 w-full flex-col'}>
                  {data.accounts.map(account => (
                    <div className='grow py-4 px-6 rounded-lg border border-blue-200 flex justify-between items-center'>

                      <div className={'flex gap-2 items-center'}>
                        <TwitterFilled/>
                        <div className={'flex gap-6'}>
                          <InfoStack title={'Twitter'} description={<a href="#">{account.twitter}</a>}/>
                        </div>

                      </div>
                      <div className={'flex gap-6'}>
                        <InfoStack title={'Followers'} description={account.followers}/>
                        <InfoStack title={'Account age'}
                                   description={`${dayjs().diff(dayjs(account.registered_at), 'year')} years ${dayjs().diff(dayjs(account.registered_at), 'month') % 12} months `}/>
                        <InfoStack title={'Posts'} description={account.posts}/>

                      </div>

                      <div><EditIcon/></div>

                    </div>
                  ))}
                </div>

              )
            }
          </Card>

          <Card>
            <h3 className={'text-2xl font-bold'}>{data.collaboration.past.length} Past collaborations</h3>
            {data.collaboration.past.length > 0 ? (
              <div className={'mt-4 w-full flex-col'}>

                {
                  data.collaboration.past.map(collab => (
                    <div className='grow p-6 rounded-lg border border-blue-200 flex justify-between items-center gap-4'>

                      <div>
                        <img src={collab.brand.image} alt={collab.brand.title}/>
                      </div>
                      <div>
                        <p className={'flex gap-3 text-xs'}>
                          {collab.tags.map(tag => (
                            <span>{tag}</span>
                          ))}
                        </p>
                        <h4 className={'text-lg font-extrabold mt-1'}>
                          {collab.content.title}
                        </h4>
                      </div>
                      <div>
                        <h4 className={'whitespace-nowrap text-lg font-extrabold'}>{collab.reward}tBnB</h4>
                        <Link to={`/collaboration/${collab.id}`}><span className={'text-base font-bold text-blue-700'}>View more</span></Link>
                      </div>
                    </div>
                  ))}
              </div>

            ) : (
              <p className={'mt-4 text-gray-400 text-base'}>Here will be a list of closed collaborations, as soon as
                your first one will be done, and money will be sent to your wallet</p>
            )}
          </Card>

          <Card>
            <h3 className={'text-2xl font-bold'}>0 Badges</h3>
            <p className={'mt-4 text-gray-400 text-base'}>Here will be a list of badges allowed for you after executing
              collaboration</p>
          </Card>
        </div>

        <div className={'flex flex-col gap-5 w-[35%]'}>
          <Card className={'py-[76px] flex justify-center items-center'}>
            <ConnectButton />
          </Card>

          <Card>
            <h3 className={'text-2xl font-bold'}>{data.collaboration.active.length} Active collaborations</h3>
            {data.collaboration.active.length > 0 ? (
              <div className={'mt-4 w-full flex-col'}>

                {
                  data.collaboration.active.map(collab => (
                    <div className='grow p-6 rounded-lg border border-blue-200 flex justify-between items-center gap-4'>

                      <div>
                        <img src={collab.brand.image} alt={collab.brand.title}/>
                      </div>
                      <div>
                        <p className={'flex gap-3 text-xs'}>
                          {collab.tags.map(tag => (
                            <span>{tag}</span>
                          ))}
                        </p>
                        <h4 className={'text-lg font-extrabold mt-1'}>
                          {collab.brand.title}
                        </h4>
                      </div>
                      <div>
                        <h4 className={'whitespace-nowrap text-lg font-extrabold'}>{collab.reward}tBnB</h4>
                        <Link to={`/collaboration/${collab.id}`}><span className={'text-base font-bold text-blue-700'}>View more</span></Link>
                      </div>
                    </div>
                  ))}
              </div>

            ) : (
              <p className={'mt-4 text-gray-400 text-base'}>Here will be a calendar of your active collaborations with
                coming deadlines </p>
            )}

          </Card>
        </div>
      </div>

    </div>
  );
};

export default InfluencerProfile;