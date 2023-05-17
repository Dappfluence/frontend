import React, {FC, useEffect, useState} from "react";
import {TAccountType} from "../../shared/types/account";
import {useForm} from "react-hook-form";
import {Modal} from "flowbite-react";

export const TypeStep: FC<{handleTypeChoice: (type: TAccountType) => void}> = ({handleTypeChoice}) => {
  return (
    <>
      <h3 className="mb-8 text-3xl font-thin text-center">
        Who are you?
      </h3>
      <div className="flex justify-center gap-4">
        <button
          className={'py-2 px-4 text-blue-700 border border-blue-700 rounded-xl'}
          onClick={() => handleTypeChoice('brand')}
        >
          Brand
        </button>
        <button
          className={'py-2 px-4 text-green-700 border border-green-700 rounded-xl'}
          onClick={() => handleTypeChoice('influencer')}
        >
          Influencer
        </button>
      </div>
    </>
  )
}

export const InfluencerStep: FC<{onSubmit: (name: string) => Promise<void>}> = ({onSubmit}) => {
  const {register, handleSubmit, formState: {errors}, reset} = useForm<{name: string}>();

  const onFormSubmit = handleSubmit((data) => {
    onSubmit(data.name);
  });

  return (
    <div className="flex justify-center gap-4">
      <form onSubmit={onFormSubmit}>
        <div className="flex flex-col gap-4 mb-8">
          <h3 className="mb-8 text-5xl font-thin text-center">
            One more thing
          </h3>
          <label className="flex flex-col gap-2">
            <span className="text-base">Enter your name:</span>
            <input
              placeholder={'John Doe'}
              type="text"
              {...register('name', {required: true})}
              className="border rounded-lg p-2"
            />
            {errors.name && <span className={'text-red-700'}>This field is required.</span>}
          </label>

        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 text-blue-700 border border-blue-700 uppercase rounded-xl disabled:cursor-not-allowed disabled:text-gray-400 disabled:border-gray-400"
        >
          Continue
        </button>

      </form>
    </div>
  )
}

export const BrandStep: FC<{onSubmit: (name: string, website: string) => Promise<void>}> = ({onSubmit}) => {
  const {register, handleSubmit, formState: {errors}, reset} = useForm<{name: string, website: string}>();

  const onFormSubmit = handleSubmit((data) => {
    onSubmit(data.name, data.website);
  });

  return (
    <div className="flex justify-center gap-4">
      <form onSubmit={onFormSubmit}>
        <div className="flex flex-col gap-4 mb-8">
          <h3 className="mb-8 text-5xl font-thin text-center">
            One more thing
          </h3>
          <label className="flex flex-col gap-2">
            <span className="text-base">Enter your brand name:</span>
            <input
              placeholder={'John Doe'}
              type="text"
              {...register('name', {required: true})}
              className="border rounded-lg p-2"
            />
            {errors.name && <span className={'text-red-700'}>This field is required.</span>}
          </label>
          <label className="flex flex-col gap-2 mt-4">
            <span className="text-base">Enter your brand website:</span>
            <input
              placeholder={'example.com'}
              type="text"
              {...register('website', {
                required: 'This field is required',
                pattern: {
                  value: /\S+\.\S+/,
                  message: "Entered value does not match website format"
                }
              })}
              className="border rounded-lg p-2"
            />
            {errors.website && <span className={'text-red-700'}>{errors.website.message}</span>}
          </label>

        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 text-blue-700 border border-blue-700 uppercase rounded-xl disabled:cursor-not-allowed disabled:text-gray-400 disabled:border-gray-400"
        >
          Continue
        </button>

      </form>
    </div>
  )
}


interface ModalProps {
  type?: TAccountType;
  step: number;
  handleTypeChoice: (type: TAccountType) => void;
  handleSubmit: (name: string, website?: string) => Promise<void>
}
export const RegisterModal: FC<ModalProps> = ({type, step, handleTypeChoice, handleSubmit}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(type === 'unknown');
  }, [step])

  useEffect(() => {
    return () => {
      setShow(false);
    }
  }, [])


  return (
    <Modal
      show={show}
      size="md"
      popup={true}
    >
      <Modal.Body className={'bg-white'}>
        <div className="p-8 pt-12">

          {step === 1 && <TypeStep handleTypeChoice={handleTypeChoice}/>}
          {step === 2 && <InfluencerStep onSubmit={handleSubmit} />}
          {step === 3 && <BrandStep onSubmit={handleSubmit} />}

        </div>
      </Modal.Body>
    </Modal>
  )
}

