class Api::ProspectsFilesController < ApplicationController
  def import
    if prospect_file_params[:file].blank? || prospect_file_params[:email_index].blank?
      render status: 400, json: {message: "File or email index missing."}
      return
    end

    new_prospect_file = ProspectsFile.create({
      **prospect_file_params,
      user_id: @user.id
    })

    BulkProspectUploadJob.perform_later(new_prospect_file, prospect_file_params[:file].path)

    render json: new_prospect_file
  end

  def progress
    prospect_file = ProspectsFile.find(params[:id])
    puts prospect_file.inspect
    render json: {
      total: prospect_file.total,
      done: prospect_file.done
    }
  end

  def prospect_file_params
    params.permit(:file, :email_index, :first_name_index?, :last_name_index?, :force?, :has_headers?)
  end
end
