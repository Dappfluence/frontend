import React, {FC} from 'react';
import {useForm} from 'react-hook-form';
import {Modal} from 'flowbite-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}

interface FormData {
  title: string;
  budget: number;
  deadline: string;
}

const CreateCollaborationModal: FC<Props> = ({isOpen, onClose, onSubmit}) => {
  const {register, handleSubmit, formState: {errors}, reset} = useForm<FormData>();

  const handleClose = () => {
    reset();
    onClose();
  }
  const onFormSubmit = handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <Modal show={isOpen} onClose={handleClose} size="3xl" popup={true}>
      <Modal.Header className="bg-white"/>
      <Modal.Body className="bg-white">
        <div className="p-8">
          <h3 className="mb-8 text-3xl font-thin">Request new Collaboration</h3>

          <form onSubmit={onFormSubmit}>
            <div className="flex flex-col gap-4 mb-8">
              <label className="flex flex-col gap-2">
                <span className="text-base">Collaboration title:</span>
                <input
                  placeholder={'e.g: Engaging twitter post featuring... '}
                  type="text"
                  {...register('title', {required: true})}
                  className="border rounded-lg p-2"
                />
                {errors.title && <span className={'text-red-700'}>This field is required.</span>}
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-base">Collaboration budget:</span>
                <div className="flex gap-4 items-center">
                  <input
                    placeholder={'Enter the value above 0.00001'}
                    {...register('budget', {required: true})}
                    className="border rounded-lg w-1/2 p-2"
                  />
                  <span>tBNB</span>
                </div>
                {errors.budget && errors.budget.type === 'required' && (
                  <span className={'text-red-700'}>This field is required.</span>
                )}
                {errors.budget && errors.budget.type === 'min' && (
                  <span className={'text-red-700'}>Minimum value is 0.00001.</span>
                )}
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-base">Collaboration due:</span>
                <input
                  type="date"
                  {...register('deadline', {required: true})}
                  className="border rounded-lg p-2"
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.deadline && <span className={'text-red-700'}>This field is required.</span>}
              </label>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="submit"
                className="py-2 px-4 text-green-700 border border-green-700 uppercase rounded-xl disabled:cursor-not-allowed disabled:text-gray-400 disabled:border-gray-400"
              >
                submit
              </button>
              <button
                className="py-2 px-4 text-red-700 uppercase border border-red-700 rounded-xl"
                onClick={handleClose}
              >
                close
              </button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CreateCollaborationModal;
