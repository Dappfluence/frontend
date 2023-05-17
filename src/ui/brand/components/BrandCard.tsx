import React, {FC, useRef, useState} from 'react';
import {PencilIcon, CheckIcon, XMarkIcon} from "@heroicons/react/24/outline";
import Card from "./Card";
import {IBrand} from "../../../shared/types/account";
import {useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import {setBrandWebsite, setDisplayName} from "../../../api/account";

interface IProps extends IBrand {
  children?: React.ReactNode;
  className?: string;
}

type FormData = Pick<IBrand, 'title' | 'link'>

const BrandCard: FC<IProps> = ({address, children, image, title, link, className = '', }) => {
  const [isEditing, setIsEditing] = useState(false);
  const {mutate: nameMutate} = useMutation<unknown, unknown, string>({
    mutationKey: ['displayName'],
    mutationFn: async (displayName: string) => setDisplayName(address!, displayName)
  })
  const {mutate: websiteMutate} = useMutation<unknown, unknown, string>({
    mutationKey: ['brandWebsite'],
    mutationFn: async (website: string) => setBrandWebsite(address!, website)
  })

  const {register, handleSubmit, formState: {errors}, reset, setValue} = useForm<FormData>({
    defaultValues: {
      title,
      link
    }
  });

  const abortChanges = () => {
    setValue('title', title);
    setValue('link', link);
    setIsEditing(false);
  }

  const onFormSubmit = handleSubmit(async (data) => {
    await nameMutate(data.title);
    await websiteMutate(data.link);
    abortChanges();
  });

  return (
    <Card className={'col-span-2'}>
      <img src={image} className={''} alt=""/>
      <form className={'flex grow justify-around'} id='form' onSubmit={onFormSubmit} >

        <div className={'flex flex-col gap-1'}>
          <span className={'text-sm'}>Company Name</span>

          {
            isEditing ? (
              <input
                placeholder={'Company name...'}
                type="text"
                {...register('title', {required: true})}
                className="border rounded-lg p-2"
              />
            ) : (
              <h3 className={'text-xl font-bold'}>{title}</h3>
            )
          }

        </div>
        <div className={'flex flex-col gap-1'}>
          <span className={'text-sm'}>Company Link</span>
          {
            isEditing ? (
              <input
                placeholder={'Company link...'}
                type="text"
                {...register('link', {required: true})}
                className="border rounded-lg p-2"
              />
            ) : (
              <a href={link} className={'text-xl text-sky-600 font-bold'}>{link}</a>
            )
          }
        </div>
      </form>

      {isEditing ? (
        <>
          <button type='submit' form='form'>
            <CheckIcon className={'w-6 h-6 text-green-600'}/>
          </button>
          <XMarkIcon onClick={abortChanges} className={'w-6 h-6 text-red-600 cursor-pointer'} />
        </>
      ) : (
        <PencilIcon className={'w-6 h-6 opacity-40 cursor-pointer'} onClick={() => {
          setIsEditing(true)
        }}/>
      )}
    </Card>
  );
};

export default BrandCard;
