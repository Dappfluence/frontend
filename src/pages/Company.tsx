import React, {FC} from 'react'
import Card from "../ui/company/components/Card";
import WalletCard from "../ui/company/components/WalletCard";
import BrandCard from "../ui/company/components/BrandCard";
import Footer from "../widgets/Footer";
import {Button} from "flowbite-react";
import {Link} from "react-router-dom";

const Company: FC = () => {

  return <div className={'p-12 py-[126px] -mt-[96px] bg-gray-100 h-screen'}>
    <h2 className={'text-5xl font-bold'}>My Company Name</h2>
    <div className={'grid grid-cols-3 mt-12 gap-8'}>
      <BrandCard/>
      <WalletCard/>
      <Card className={'col-span-2'}>
        <div className={'flex flex-col gap-1'}>
          <span className={'text-2xl font-bold'}>Collaborations</span>
          <p className={'text-gray-400'}>Here will be a detailed information about your collaborations, as soon as your
            first one will be
            created</p>
        </div>
      </Card>
      <Card className={'col-span-1'}>
        <div className={'flex flex-col gap-1'}>
          <span className={'text-2xl font-bold'}>Active collaborations</span>
          <p className={'text-gray-400'}>Here will be a brief information about your active collaborations</p>
        </div>
      </Card>
    </div>
    <Footer>
      <Link to={'/collaboration/new'}>
        <Button>Create new collaboration</Button>
      </Link>
    </Footer>
  </div>
}


export default Company;
