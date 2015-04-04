# class GamesController < ApplicationController
#   layout false
#
#   def data
#     if params[:game].present? && params[:key]
#       found = GameData.find_by game: params[:game], key: params[:key]
#       if found
#         render json: [found.data], status: :ok
#       else
#         render nothing: true, status: :not_found
#       end
#     else
#       render nothing:true, status: :bad_request
#     end
#   end
#
#   def store_data
#     resp_status = if params[:game].present? && params[:key].present?
#                     gd = GameData.new game: params[:game], key: params[:key], data: params[:data]
#                     if gd.save
#                       :ok
#                     else
#                       :not_acceptable
#                     end
#                   else
#                     :bad_request
#                   end
#     render nothing:true, status: resp_status
#   end
#
#   def any_data
#     if params[:game].present? && params[:key_prefix]
#       found = GameData.game(params[:game]).key_begins(params[:key_prefix]).limit 20
#       render json: found.to_a.map{|gd| [gd.key, gd.data]}, status: :ok
#     else
#       render nothing:true, status: :bad_request
#     end
#   end
#
#   def any_keys
#     if params[:game].present? && params[:key_prefix]
#       found = GameData.game(params[:game]).key_begins(params[:key_prefix]).limit 20
#       render json: found.to_a.map(&:key), status: :ok
#     else
#       render nothing:true, status: :bad_request
#     end
#   end
#
# end